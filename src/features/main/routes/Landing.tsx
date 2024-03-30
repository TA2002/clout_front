// import { useEffect, useState } from "react";
// import Container from "@/components/ui/container";
// import InfluencerList from "@/components/ProductList";
// import Loading from "@/loading";
// import { DataTableFacetedFilter } from "../components/DataFilter";

// import { useInfluencers } from "../api/getInfluencers";
// import { useToast } from "@/components/ui/use-toast";
// import { ToastAction } from "@/components/ui/toast";

// export const Landing = () => {
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(true);
//   const influencers = useInfluencers();

//   const platformOptions = [
//     { label: "Instagram", value: "instagram" },
//     { label: "Tiktok", value: "tiktok" },
//     { label: "Youtube", value: "youtube" },
//   ];

//   const nicheOptions = [
//     { label: "Lifestyle", value: "lifestyle" },
//     { label: "Fashion", value: "fashion" },
//     { label: "Beauty", value: "beauty" },
//   ];

//   const [selectedPlatformValues, setSelectedPlatformValues] = useState([]);
//   const [selectedNicheValues, setSelectedNicheValues] = useState([]);

//   // Function to handle changes in selected values
//   const handleSelectedPlatformChange = (newSelectedPlatform: any) => {
//     setSelectedPlatformValues(newSelectedPlatform);
//   };

//   const handleSelectedNicheChange = (newSelectedNiche: any) => {
//     setSelectedNicheValues(newSelectedNiche);
//   };

//   useEffect(() => {
//     if (!influencers.isLoading) {
//       setIsLoading(false);
//     }
//   }, [influencers.isLoading]);

//   useEffect(() => {}, []);
//   return (
//     <>
//       {isLoading || influencers.data == undefined ? (
//         <Loading />
//       ) : (
//         <div className="bg-gradient-to-r from-slate-900 to-slate-700 h-screen">
//           <Container>
//             <div className="">
//               <div className="flex flex-col text-left gap-5 px-10 mt-10">
//                 <p className="text-2xl font-bold text-gray-400">CLOUT</p>
//                 <p className="text-6xl font-medium text-white">
//                   Best collaborations
//                 </p>
//                 <p className="text-6xl font-medium bg-gradient-to-r from-orange-500 to-red-700 bg-clip-text text-transparent">
//                   start here.
//                 </p>
//                 <p className="text-xl font-medium text-gray-200">
//                   Find top Instagram, TikTok, YouTube influencers for your
//                   brand.
//                 </p>
//               </div>
//             </div>
//           </Container>
//         </div>
//       )}
//     </>
//   );
// };
