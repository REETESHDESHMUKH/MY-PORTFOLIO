import Sidebar from "./side-bar/sidebar";

export default function Landing() {
  return (
    <div className="flex flex-row gap-8 h-full p-8">
      <div className="w-[25%] h-auto rounded-xl p-2 bg-amber-950">
        <Sidebar/>
      </div>
      <div className="w-[75%] h-auto rounded-xl p-2 bg-red-100">
        
      </div>
    </div>
  );
}
