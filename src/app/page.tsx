import { Box } from "@mui/material"
import { Raleway} from 'next/font/google'
import styles from "./page.module.css"; 
import Gadget from "@/component/Gadget"
import Section from "@/component/Section"

const Ral=Raleway({
  weight:'400'
  ,subsets:['latin']

})
export default function Page() {
  return (
    <div className={Ral.className} style={{width:"100%"}}>
      <div className={styles.backgroundContainer}></div>
      <Gadget/>
      <Section/>
    </div>
  )
}
