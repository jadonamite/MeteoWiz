"use client";

import { useState } from "react";

const SynopValuesSection = () => {
   // State for SYNOP register data (skeleton with placeholder structure)
   const [synopData, setSynopData] = useState({
      // First row of SYNOP groups
      row1: {
         TIME: "0830Z",
         iRiXhVV: "42358",
         NddFF: "72108",
         "1SnTTT": "10266",
         "2Sn1d1d1d": "20239",
         "3P0P0P0P0": "30063",
         "4PPPP": "40155",
         "5aPPP": "",
         "6RRRtR": "",
         "7WW1w1w2": "",
         "8NsChsCMCH": "84508",
      },
      // Second row of SYNOP groups
      row2: {
         "9hh//": "9hh//",
         "1SnTxTxTx": "1SnTxTxTx",
         "2SnTnTnTn": "2SnTnTnTn",
         "5(9)2P24P24P24": "5(9)2P24P24P24",
         "8NsChshshs": "8NsChshshs",
         "9SpSpspsp": "9SpSpspsp",
         WETRBHVP: "WETRBHVP",
         Remarks: "Remarks",
      },
      row2Values: {
         "9hh//": "909//",
         "1SnTxTxTx": "",
         "2SnTnTnTn": "",
         "5(9)2P24P24P24": "",
         "8NsChshshs": "84509 87280",
         "9SpSpspsp": "",
         WETRBHVP: "",
         Remarks: "24 7 85|29 6",
      },
   });

   return (
      <div className="bg-gray-300 border-2 border-gray-400 rounded h-full flex  flex-col">
         {/* Content - Two rows of SYNOP groups */}
         <div className="flex-1 grid gap-4 overflow-auto">
            {/* First Row - Main SYNOP Groups */}
            <table className="w-full border-collapse text-xs">
               <thead>
                  <tr className="bg-gray-400">
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        TIME
                     </th>
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        iRiXhVV
                     </th>
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        Nddff
                     </th>
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        1SnTTT
                     </th>
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        2Sn1d1d1d
                     </th>
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        3P0P0P0P0
                     </th>
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        4PPPP
                     </th>
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        5aPPP
                     </th>
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        6RRRtR
                     </th>
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        7WW1w1w2
                     </th>
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        8NsChsCMCH
                     </th>
                  </tr>
               </thead>
               <tbody>
                  <tr className="bg-yellow-100">
                     <td className="border border-gray-500 px-2 py-1 text-center font-semibold">
                        {synopData.row1.TIME}
                     </td>
                     <td className="border border-gray-500 px-2 py-1 text-center">
                        {synopData.row1.iRiXhVV}
                     </td>
                     <td className="border border-gray-500 px-2 py-1 text-center">
                        {synopData.row1.NddFF}
                     </td>
                     <td className="border border-gray-500 px-2 py-1 text-center">
                        {synopData.row1["1SnTTT"]}
                     </td>
                     <td className="border border-gray-500 px-2 py-1 text-center">
                        {synopData.row1["2Sn1d1d1d"]}
                     </td>
                     <td className="border border-gray-500 px-2 py-1 text-center">
                        {synopData.row1["3P0P0P0P0"]}
                     </td>
                     <td className="border border-gray-500 px-2 py-1 text-center">
                        {synopData.row1["4PPPP"]}
                     </td>
                     <td className="border border-gray-500 px-2 py-1 text-center">
                        {synopData.row1["5aPPP"]}
                     </td>
                     <td className="border border-gray-500 px-2 py-1 text-center">
                        {synopData.row1["6RRRtR"]}
                     </td>
                     <td className="border border-gray-500 px-2 py-1 text-center">
                        {synopData.row1["7WW1w1w2"]}
                     </td>
                     <td className="border border-gray-500 px-2 py-1 text-center">
                        {synopData.row1["8NsChsCMCH"]}
                     </td>
                  </tr>
               </tbody>
            </table>

            {/* Second Row - Additional SYNOP Groups */}
            <table className="w-full border-collapse text-xs">
               <thead>
                  <tr className="bg-gray-400">
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        9hh//
                     </th>
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        1SnTxTxTx
                     </th>
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        2SnTnTnTn
                     </th>
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        5(9)2P24P24P24
                     </th>
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        8NsChshshs
                     </th>
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        9SpSpspsp
                     </th>
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        WETRBHVP
                     </th>
                     <th className="border border-gray-500 px-2 py-1 font-bold">
                        Remarks
                     </th>
                  </tr>
               </thead>
               <tbody>
                  <tr className="bg-yellow-100">
                     <td className="border border-gray-500 px-2 py-1 text-center font-semibold">
                        {synopData.row2Values["9hh//"]}
                     </td>
                     <td className="border border-gray-500 px-2 py-1 text-center">
                        {synopData.row2Values["1SnTxTxTx"]}
                     </td>
                     <td className="border border-gray-500 px-2 py-1 text-center">
                        {synopData.row2Values["2SnTnTnTn"]}
                     </td>
                     <td className="border border-gray-500 px-2 py-1 text-center">
                        {synopData.row2Values["5(9)2P24P24P24"]}
                     </td>
                     <td className="border border-gray-500 px-2 py-1 text-center">
                        {synopData.row2Values["8NsChshshs"]}
                     </td>
                     <td className="border border-gray-500 px-2 py-1 text-center">
                        {synopData.row2Values["9SpSpspsp"]}
                     </td>
                     <td className="border border-gray-500 px-2 py-1 text-center">
                        {synopData.row2Values.WETRBHVP}
                     </td>
                     <td className="border border-gray-500 px-2 py-1 text-center">
                        {synopData.row2Values.Remarks}
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default SynopValuesSection;
