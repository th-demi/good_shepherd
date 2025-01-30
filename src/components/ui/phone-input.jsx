"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import PhoneInputWithCountry from "react-phone-number-input"

import "react-phone-number-input/style.css"

const PhoneInput = React.forwardRef((props, ref) => {
  return (
    <PhoneInputWithCountry
      {...props}
      international
      countryCallingCodeEditable={false}
      defaultCountry="US"
      className="flex"
      inputComponent={Input}
    />
  )
})
PhoneInput.displayName = "PhoneInput"

export { PhoneInput }