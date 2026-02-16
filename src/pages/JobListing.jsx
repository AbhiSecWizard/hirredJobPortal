import { getJobs } from "@/api/apijobs"
import { getCompanies } from "@/api/companies"
import JobCard from "@/components/JobCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import useFetch from "@/hooks/use_fetch"
import { useUser } from "@clerk/clerk-react"
import { State } from "country-state-city"
import { useEffect, useState } from "react"
import { BarLoader } from "react-spinners"

const JobListing = () => {
const [searchQuery, setSearchQuery] = useState("");
const [location, setLocation] = useState("");
const [company_id, setCompany_id] = useState("");
const {isLoaded} = useUser()

const {fn:fnJobs,data:jobs,loading:loadingJobs,error:jobError} = useFetch(getJobs,{
  location,
  company_id,
  searchQuery,
})


const {fn:fnCompanies,data:companies} = useFetch(getCompanies)
useEffect(()=>{
  if(isLoaded) fnCompanies()
},[isLoaded])

useEffect(() => {
  if (isLoaded) {
    fnJobs();
  }
}, [isLoaded, searchQuery, location, company_id]);
const handleSearch = (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);

  const query = formData.get("search-query");
  if (query) setSearchQuery(query);
};

function clearFilter (){
  setSearchQuery("")
  setLocation("")
  setCompany_id("")
}


if(!isLoaded){
  return <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/>
}
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8 ">
Latest jobs
      </h1>

      {/* {adding filter here for as search } */}
      <form onSubmit={handleSearch} action="" className="flex gap-2.5 h-14 w-full items-center mb-3">
        <Input type="text" placeholder="search Jobs by title" name="search-query" className="h-full flex-1 px-4 font-bold "/>
        <Button className={"h-full sm:w-28 "} variant="blue">
          Search
        </Button>
      </form>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2 w-full">
  {/* Location Filter */}
  <Select value={location} onValueChange={(value) => setLocation(value)}>
    <SelectTrigger className="w-full sm:w-3/7">
      <SelectValue placeholder="Filter by Location" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {State.getStatesOfCountry("IN").map(({ name }) => (
          <SelectItem key={name} value={name}>
            {name}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>

  {/* Company Filter */}
  <Select
    value={company_id}
    onValueChange={(value) => setCompany_id(value)}
  >
    <SelectTrigger className="w-full sm:w-3/7">
      <SelectValue placeholder="Filter by Company" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {companies?.map(({ name, id }) => (
          <SelectItem key={id} value={id.toString()}>
            {name}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>

  {/* Clear Button */}
  <Button
    variant="destructive"
    className="w-full sm:w-1/7 sm:h-10"
    onClick={clearFilter}
  >
    Clear
  </Button>
</div>
      {
        loadingJobs && (
          <BarLoader className="mt-4"  width={"100%"} color='#36d7b7'/>
        )
      }
      {loadingJobs === false && (
        <div className="my-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
                 jobs.map((job)=>(
                      <JobCard key={job.id} job={job} 
                     savedInit={job?.saved?.length>0}
                     />
                 ))
          ):(
            <div>
             For some Resion , data is not fatched 
            </div>
          )
            
          }
        </div>
      )} 
    </div>
  )
}

export default JobListing
