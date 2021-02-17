import { useApolloClient } from "@apollo/client";
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const apollo = useApolloClient()

  const [logout, { loading: logoutFetch }] = useLogoutMutation();
  const { data, loading } = useMeQuery({
    skip: isServer(), //pause query when page is rendered on server
  });

  let body = null;

  if (loading) {
    //nothing
  } else if (data?.me) {
    //logged in
    body = (
      <Flex alignItems={"center"} m="auto">
        <NextLink href="/create-post">
          <Button as={Link} mr={4}>
            Create Post
          </Button>
        </NextLink>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          variant="link"
          isLoading={logoutFetch}
          onClick={async () => {
            await logout();
            await apollo.resetStore()
          }}
        >
          Logout
        </Button>
      </Flex>
    );
  } else {
    //not logged in
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  }

  return (
    <Flex position="sticky" zIndex={2} top={0} bg="tomato" p={4}>
      <Flex flex={1} maxW={800} align={"center"} margin={"auto"}>
        <NextLink href="/">
          <Link>
            <Heading>LiReddit</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
