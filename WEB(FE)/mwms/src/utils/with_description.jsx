export default function Title({title}) {
  return (
    <div> 
      <h1 class={`sm:flex hidden border-b-2 border-cyan-500 md:mx-80  pb-6 font-bold text-3xl text-white`}>
        {title}
      </h1>
  
      <h1 class="sm:hidden border-b-2 border-cyan-500 text-[32px] mx-4 font-bold text-white text-center pb-6">
        {title}
      </h1> 

    </div>
  )
}
