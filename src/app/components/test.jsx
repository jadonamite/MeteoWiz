"use client";
import {useMetar} from "../context/MetarContext";

const ObservedValuesSection = () =>{
   const {observedData, setObserveddata} = useMetar();

   const handleChange = (field, value) => {
      setObserveddata((prev) => ({...prev, [field]: value}));
   }
   
}