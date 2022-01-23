import { useContext } from "react";
import Image from "next/image";
import {Box,Icon,Flex} from '@chakra-ui/react'
import {ScrollMenu,VisibilityContext} from 'react-horizontal-scrolling-menu'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";





const LeftSide = ()=>{
    const {scrollPrev} = useContext(VisibilityContext)
    return(
        <Flex marginRight="1"  justifyContent="center" alignItems="center">
            <Icon as={FaArrowAltCircleLeft}  onClick={()=>scrollPrev()} fontSize="2xl" cursor="pointer" />

        </Flex>
    )
}


const RightSide = ()=>{
    const {scrollNext} = useContext(VisibilityContext)
    return(
        <Flex marginLeft="1" justifyContent="center" alignItems="center">
            <Icon as={FaArrowAltCircleRight} onClick={()=>scrollNext()} fontSize="2xl" cursor="pointer" />

        </Flex>
    )
}








const ImageScroll = ({pic})=>{

return(
    <ScrollMenu style={{overflow:"hidden"}} LeftArrow={LeftSide} RightArrow={RightSide} >
        {pic.map((p)=>(
           
            <Box key={p.id} width="910px" overflow="hidden" p="1">
                <Image src={p.url} width={1000} height={500} placeholder="blur" blurDataURL={p.url} alt="asset" sizes="(max-width:500px) 100px, (max-width:1023px) 400px,1000px"  />
               
            </Box>
        ))}

    </ScrollMenu>

)
}

export default ImageScroll