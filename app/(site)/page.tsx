import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "@/components/PageContent";

export const revalidate = 0; // don't cache this page

export default async function Home() {
  const songs = await getSongs();
  return (
     <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-hidden ">
        <Header>
          <div className="mt-10">
                <h1 className="font-bold text-3xl py-3">Welcom Back</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                   <ListItem
                        name="Liked Songs" 
                        image="/images/liked.png" 
                        href="liked" 
                   />
                 </div>
          </div>
        </Header>

        <div className="my-5 p-5">
           <div className="flex justify-between items-center">
              <h1 className="text-white font-semibold text-2xl">Newest Songs</h1>
           </div>
           <PageContent songs={songs} />
        </div>
     </div>
  )
}
