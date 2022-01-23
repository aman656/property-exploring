import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { baseUrl, fetchingPlaces } from "../utils/bayut";
import Properties from "../components/Properties";

export const Banner = ({
  forwhat,
  title1,
  title2,
  desc1,
  desc2,
  btnText,
  where,
  imageUrl,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {forwhat}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button fontSize="xl">
        <Link href={where}>{btnText}</Link>
      </Button>
    </Box>
  </Flex>
);

export default function Home({ forsale, forrent }) {
  const url =
    "https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4";
  const url2 =
    "https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008";
  return (
    <Box>
      <Banner
        forwhat="RENT A PLACE"
        title1="Homes on Rent"
        title2="AnyOne"
        desc1="Explore Appartments and Villas"
        desc2="and more"
        btnText="Explore Places"
        where="/search?purpose=for-rent"
        imageUrl={url}
      />
      <Flex flexWrap="wrap">
        {forrent.map((pro) => (
          <Properties pro={pro} key={pro.id} />
        ))}
      </Flex>
      <Banner
        forwhat="BUY A PLACE"
        title1="Homes on Sale"
        title2="EveryOne"
        desc1="Explore Appartments and Villas"
        desc2="and more"
        btnText="Explore Places"
        where="/search?purpose=for-sale"
        imageUrl={url2}
      />
      <Flex flexWrap="wrap">
        {forsale.map((pro) => (
          <Properties pro={pro} key={pro.id} />
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const forsale = await fetchingPlaces(
    `${baseUrl}/properties/list/?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const forrent = await fetchingPlaces(
    `${baseUrl}/properties/list/?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      forsale: forsale?.hits,
      forrent: forrent?.hits,
    },
  };
}
