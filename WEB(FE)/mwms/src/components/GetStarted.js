import styles from "../style";
import  arrowUp  from "../assets/arrow-up.svg";
import { Link } from 'react-router-dom'

const GetStarted = () => (
  
    <Link to="/login" class={`${styles.flexCenter} w-[120px] h-[120px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}>
      <div class={`${styles.flexCenter} flex-col bg-primary-900 w-[100%] h-[100%] rounded-full`}>
        <div class={`${styles.flexStart} flex-row`}>
          <img src={arrowUp} alt="arrow-up" class="w-[23px] h-[23px] object-contain" />
        </div>
      
        <p class="font-poppins font-medium text-[18px] leading-[23.4px]">
          <span class="text-gradient">시작하기</span>
        </p>
      </div>
    </Link>
  
);

export default GetStarted;