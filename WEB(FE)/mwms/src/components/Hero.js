import React from 'react'
import styles from '../style';
import warehouseImg from '../images/warehouse.png'

function Hero() 
{
    return (
        <section id="home" class={`flex md:flex-row flex-col ${styles.paddingY}`}>
        <div class={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
          <div class="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
            
            <p class={`${styles.paragraph} ml-2`}>
              MWMS
            </p>
          </div>
  
          <div class="flex flex-row justify-between items-center w-full">
            <h1 class="flex-1 font-poppins font-semibold ss:text-[60px] text-[48px] text-white ss:leading-[100.8px] leading-[75px]">
                국방물자관리체계 <br class="sm:block hidden" />{" "}
              <span class="text-gradient">Military Warehouse</span>{" "}
            </h1>
          </div>
  
          <h1 class="font-poppins font-semibold ss:text-[56px] text-[48px] text-white ss:leading-[100.8px] leading-[75px] w-full">
            Management System
          </h1>
          <p class={`${styles.paragraph} max-w-[470px] mt-5`}>
          국방 물자 관리 체계를 통해서 군 부대의 여러 물품과 자재들을 효과적으로 보관 및 관리를 할 수 있습니다.
          </p>
        </div>
  
        <div class={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
          <img src={warehouseImg} alt="billing" class="w-[100%] h-[100%] relative z-[5]" />
  
          {/* gradient start */}
          <div class="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
          <div class="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
          <div class="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
          {/* gradient end */}
        </div>
  
      </section>
    )
}

export default Hero