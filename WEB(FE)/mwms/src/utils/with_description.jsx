export default function Title({title, color}) {
  return (
    <div> 
      <h1 class={`sm:flex hidden border-b-2 border-[#706F6F] md:mx-80  pb-6 font-bold text-3xl ` + (color ? "" : "text-white")}>
        {title}
      </h1>
  
      <h1 class={"sm:hidden border-b-2 border-cyan-500 text-[32px] mx-4 font-bold text-white text-center pb-6 "  + (color ? "" : "text-white")}>
        {title}
      </h1> 

    </div>
  )
}
