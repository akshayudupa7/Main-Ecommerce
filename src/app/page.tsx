import { Box } from "@mui/material"
import { Raleway} from 'next/font/google'
import styles from "./page.module.css"; 
import Gadget from "@/component/Gadget"
import Section from "@/component/Section"
import Carousel from "@/component/Carousel";
import "./page.module.css"
const Ral=Raleway({
  weight:'400'
  ,subsets:['latin']

})
export default function Page() {
  return (
    <div className={Ral.className}>
   <div className="hello"  style={{width:"100%",backgroundColor:"#07273c"}}>
      <Carousel/>
      <Gadget/>
      <Section/>
   </div>
 
    </div>
  )
}
