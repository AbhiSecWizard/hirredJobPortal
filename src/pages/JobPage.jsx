import { getSingleJob, updateHiringStatus } from "@/api/apijobs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use_fetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import {ApplyJobDrawer} from "@/components/ApplyJobDrawer";
import ApplicationCard from "@/components/ApplicationCard";

const JobPage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  // Fetch Job
  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, { job_id: id });
   
  console.log(user)
  // Update Hiring Status
  const {
    loading: loadingHiringStatus,
    fn: fnHiringStatus,
  } = useFetch(updateHiringStatus, { job_id: id });

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  const handleStatusChange = async (value) => {
    const isOpen = value === "open";
    await fnHiringStatus(isOpen);
    fnJob();
  };

  if (!isLoaded || loadingJob) {
    return <BarLoader width="100%" color="#36d7b7" />;
  }

  const isRecruiter = job?.recruiter_id === user?.id;
  const isApplied = job?.applications?.some(
    (ap) => ap.candidate_id === user?.id
  );

  return (
    <div className="flex flex-col gap-8 mt-5">

      {/* Title + Logo */}
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} className="h-20" alt="logo" />
      </div>

      {/* Job Meta */}
      <div className="flex justify-between">

        <div className="flex gap-2 items-center">
          <MapPinIcon size={18} />
          {job?.location}
        </div>

        <div className="flex gap-2 items-center">
          <Briefcase size={18} />
          {job?.applications?.length || 0}
        </div>

        <div className="flex gap-2 items-center">
          {job?.isOpen ? (
            <>
              <DoorOpen size={18} /> Open
            </>
          ) : (
            <>
              <DoorClosed size={18} /> Closed
            </>
          )}
        </div>

      </div>

      {/* Recruiter Hiring Toggle */}
      {isRecruiter && (
        <>
          {loadingHiringStatus && (
            <BarLoader width="100%" color="#36d7b7" />
          )}
          <Select onValueChange={handleStatusChange}>
            <SelectTrigger
              className={`w-full ${
                job?.isOpen ? "bg-green-950" : "bg-red-950"
              }`}
            >
              <SelectValue
                placeholder={`Hiring Status (${
                  job?.isOpen ? "Open" : "Closed"
                })`}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </>
      )}

      {/* Description */}
      <h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
      <p className="sm:text-lg">{job?.description}</p>

      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>
      <MDEditor.Markdown
        source={job?.requirements}
        className="bg-transparent sm:text-lg"
      />

      {/* Candidate Apply Section */}
      {!isRecruiter && (
        <ApplyJobDrawer
          job={job}
          user={user}
          applied={isApplied}
          fetchJob={fnJob}
        />
      )}
      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
  <div>
    <h2 className="text-2xl sm:text-3xl font-bold">Applications</h2>

    {job?.applications.map((application) => {
      return (
        <ApplicationCard
          key={application.id}
          application={application}
        />
      );
    })}
  </div>
)}
    </div>
  );
};

export default JobPage;
