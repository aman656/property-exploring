import {data,getFilterValues } from '../utils/data'
import { useEffect, useState } from 'react';
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button,Form } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';
import { baseUrl, fetchingPlaces } from '../utils/bayut';
import noresult from '../assets/images/noresult.svg';



const Filters = ()=>{
  const [showLocations,setShow] = useState(false)
  const [searchTerm,setSearchTerm] = useState("")
  const [isLoading,setisLoading] = useState(false)
  
  const [locationData, setLocationData] = useState();
    const [filters] = useState(data);
    const router = useRouter()

    useEffect(()=>{
      const  fetchingLocations = async()=>{
        setisLoading(true)
        const response = await fetchingPlaces(`${baseUrl}/auto-complete?query=${searchTerm}`)
        setisLoading(false)
        setLocationData(response?.hits)
      }
      fetchingLocations()
    },[searchTerm])
 

    const searchProperties = (filterValues)=>{
      const path = router.pathname
   
      const {query} = router
      console.log(query)
      const values = getFilterValues(filterValues)
      values.forEach((d)=>{
        if(d.value &&  filterValues?.[d.name]){
        query[d.name] = d.value
         } })
router.push({pathname:path,query:query})

    }
    return(
        <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
        {filters?.map((filter) => (
          <Box key={filter.queryName}>
            <Select onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })} placeholder={filter.placeholder} w='fit-content' p='2' >
              {filter?.items?.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Box>
        ))}
         <Flex flexDir='column'>
        <Button onClick={() => setShow(!showLocations)} border='1px' borderColor='gray.200' marginTop='2' >
          Search Location
        </Button>
        {showLocations && (
          <Flex flexDir='column' pos='relative' paddingTop='2'>
            <Input
              placeholder='Type Here'
              value={searchTerm}
              w='300px'
              focusBorderColor='gray.300'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
              {searchTerm !== '' && (
              <Icon
                as={MdCancel}
                pos='absolute'
                cursor='pointer'
                right='5'
                top='5'
                color="blue"
                zIndex='100'
                onClick={() => setSearchTerm('')}
              />
            )}
                
                
                {isLoading && <Spinner margin='auto' marginTop='3' />}
            {showLocations && (
              <Box height='300px' overflow='auto'>
                {locationData?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      searchProperties({ locationExternalIDs: location.externalID });
                      setShow(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <Text cursor='pointer' bg='gray.200' p='2' borderBottom='1px' borderColor='gray.100' >
                      {location.name}
                    </Text>
                  </Box>
                ))}
                {!isLoading && !locationData?.length && (
                  <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5' >
                    <Image src={noresult} />
                    <Text fontSize='xl' marginTop='3'>
                      Waiting to search!
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
            </Flex>
             )}
            </Flex>
        </Flex>
        
    )
}

export default Filters