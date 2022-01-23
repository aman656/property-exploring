import Link from "next/link";
import Image from "next/image";
import { Flex, Box,Text,Avatar } from "@chakra-ui/react";
import {FaBed,FaBath} from 'react-icons/fa'
import {BsGridFill} from 'react-icons/bs'
import {GoVerified} from 'react-icons/go'
import millify from "millify";


const Properties = ({pro:{price,rentFrequency,title,coverPhoto,rooms,baths,area,agency,isVerified,externalID,location}})=>{
    return(
     <Link href={`/single/${externalID}`}>
         <Flex flexWrap="wrap" w="420px" p="5" paddingTop="0"  justifyContent="flex-start" cursor="pointer">
             <Box>
                 <Image  src={coverPhoto?.url} width={400} height={260} alt="places" />
             </Box>
             <Box w="full" >
             <Flex alignItems="center" justifyContent="space-between" paddingTop="2">
                 <Flex alignItems="center">
                     <Box paddingRight="3" color="green.400">{isVerified && <GoVerified/>}</Box>
                     <Text fontSize="lg" fontWeight="bold">${millify(price)}{rentFrequency && `/${rentFrequency}`}</Text>
                 </Flex>
                 <Box>
                     <Avatar size="sm" src={agency?.logo?.url}/>
                 </Box>
                 </Flex>
                 <Flex alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400">
                     {rooms}  <FaBed/> | {baths}  <FaBath/> |  {millify(area)}  sq.ft <BsGridFill/> 
                 </Flex>
                 <Text fontSize="lg">{title.length > 30 ? `${title.substring(0,30)}...`: title}</Text>
                 <Text>{location.map((l)=>l.name+ ", ")}</Text>
            

             </Box>

         </Flex>
    </Link>
    )
}

export default Properties