import { useState } from "react"

export const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (e) => {
    // e ? setValue(e.target.value) : setValue("")
    /*
        Ensimmäinen ratkaisu tehtävään 7.6 oli hoitaa tilan "resettaus" onChange-metodilla
        kutsumalla sitä ilman parametriä ja tsekata tässä tuliko event-objekti kutsun mukana 
        vai ei ja sen perustella päättää oliko kyseessä "reset" vai normaali onChange-kutsu
    */

    setValue(e.target.value)
  }

  const reset = () => {
    setValue("")
  }

  return { 
    props: { 
      type, value, onChange 
    },
    reset
  }
}