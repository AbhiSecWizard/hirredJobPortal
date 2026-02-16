<!-- how to connect supabase  -->

1. First create New Project with name and password 
2. You created current project example: Hirred
3. Hirred project and click on _Connect_
4. One pop up will open > App Framework > Frameworks :React  , using : vite ,with :supabase
5. copy .env  and paste this in folder where your project is working in vs code first create .env file and paste that 
6. second copy utils/supabase.js before this create that folder structure src> utils> supabase.js and paste here that copied file 
7. first install in termial a package witch name is @supabase/supabase-js
    npm i @supabase/supabase-js
<!-- ------------------------------------------------------------------------ -->

<!-- now we are connect supabase with clerk  -->

* first proper setup in clerk 
* like install clerk and install clerk theme 
<!-- now we are connect supabase with clerk  -->
1. first goto create clerk and create JWT Template 
   sessions> JWT template > New Template > select supabase
   following are example that how can you fill all input 
   . name: supabase 
   . template : supabase
   . token timeline : 60
   . signing key : where we find this ? goto clerk and find > Api docs > JWT keys> Jwt secret reveal and copy and pest that 
2. and put a function in SQl editor code is below

   <!--  -->

CREATE OR REPLACE FUNCTION requesting_user_id()
RETURNS TEXT
LANGUAGE sql
STABLE
AS $$
  SELECT NULLIF(
    current_setting('request.jwt.claims', true)::json->>'sub',
    ''
  );
$$;
 

                


//////////////////
// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useUser } from "@clerk/clerk-react";
// import { BarLoader } from "react-spinners";
// import MDEditor from "@uiw/react-md-editor";
// import {
//   MapPinIcon,
//   Briefcase,
//   DoorOpen,
//   DoorClosed,
// } from "lucide-react";

// import { getSingleJob, updateHiringStatus } from "@/api/apijobs";
// import useFetch from "@/hooks/use_fetch";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const JobPage = () => {
//   const { isLoaded, user } = useUser();
//   const { id } = useParams();

//   /* ---------------- Fetch Single Job ---------------- */
//   const {
//     loading: loadingJob,
//     data: job,
//     fn: fnJob,
//   } = useFetch(getSingleJob, {
//     job_id: id,
//   });

//   /* ---------------- Update Hiring Status ---------------- */
//   const {
//     loading: loadingHiringStatus,
//     fn: fnHiringStatus,
//   } = useFetch(updateHiringStatus,{
//     job_id:id
//   });

//   /* ---------------- Handle Open / Close ---------------- */
// const handleStatusChange =(value)=>{
//   const isOpen = value === "open";
//   fnHiringStatus(isOpen).then(()=>{
//     fnJob(); // refetch updated data
//   })
// };

//   /* ---------------- Initial Load ---------------- */
//   useEffect(() => {
//     if (isLoaded) fnJob();
//   }, [isLoaded]);

//   if (!isLoaded || loadingJob) {
//     return (
//       <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
//     );
//   }

//   return (
//     <div className="flex flex-col gap-8 mt-5">

//       {/* -------- Title + Logo -------- */}
//       <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
//         <h1 className="gradient-title font-extrabold text-4xl sm:text-6xl">
//           {job?.title}
//         </h1>
//         <img
//           src={job?.company?.logo_url}
//           className="h-12"
//           alt={job?.title}
//         />
//       </div>

//       {/* -------- Meta Info -------- */}
//       <div className="flex justify-between flex-wrap gap-4">
//         <div className="flex gap-2 items-center">
//           <MapPinIcon />
//           {job?.location}
//         </div>

//         <div className="flex gap-4 items-center">
//           <div className="flex gap-2 items-center">
//             <Briefcase />
//             {job?.applications?.length} Applicants
//           </div>

//           <div className="flex gap-2 items-center">
//             {job?.isOpen ? (
//               <>
//                 <DoorOpen /> Open
//               </>
//             ) : (
//               <>
//                 <DoorClosed /> Closed
//               </>
//             )}
//           </div>
//         </div>
//       </div>
                
//       {/* -------- Hiring Status (Only Recruiter) -------- */}
//      {/* Hiring Status (Only Recruiter) */}
// {job?.recruiter_id === user?.id && (
//   <Select
//     value={job?.isOpen ? "open" : "closed"}
//     onValueChange={handleStatusChange}
//   >
//     <SelectTrigger
//         className={`w-full text-white ${
//           job?.isOpen ? "bg-green-950" : "bg-red-950"
//         }`}
//       >
//       <SelectValue placeholder={"Hiring Status" + (job?.isOpen ? "(Open)" : "(Closed")} />
//     </SelectTrigger>

//     <SelectContent>
//       <SelectItem value="open">Open</SelectItem>
//       <SelectItem value="closed">Closed</SelectItem>
//     </SelectContent>
//   </Select>
// )}


//       {/* -------- Description -------- */}
//       <h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
//       <p className="sm:text-lg">{job?.description}</p>

//       {/* -------- Requirements -------- */}
//       <h2 className="text-2xl sm:text-3xl font-bold">
//         What we are looking for
//       </h2>

//       <MDEditor.Markdown
//         source={job?.requirements}
//         className="bg-transparent sm:text-lg"
//       />
//     </div>
//   );
// };


// export default JobPage;








