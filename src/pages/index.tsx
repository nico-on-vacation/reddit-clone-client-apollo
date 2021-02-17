import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import EditDeletePostButtons from "../components/EditDeletePostButtons";
import { Layout } from "../components/Layout";
import { UpdootSection } from "../components/UpdootSection";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import createWithApollo from "../utils/withApollo";

const Index = () => {
  const { data: meData } = useMeQuery();
  const { data, loading, fetchMore, variables } = usePostsQuery({
    variables: { limit: 15, cursor: null },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return <div>Something went wrong fetching the posts :/</div>;
  }

  return (
    <Layout>
      {!data ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8} mt={8}>
          {/* {data.posts.posts.map((p) => ( */}
          {data.posts.posts?.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p} />
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>by {p.creator.username}</Text>
                  <Flex alignItems={"center"}>
                    <Text>{p.textSnippet}</Text>
                    {meData?.me?.id !== p.creator.id ? null : (
                      <Box ml={"auto"}>
                        <EditDeletePostButtons id={p.id} />
                      </Box>
                    )}
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() =>
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
              })
            }
            isLoading={loading}
            mx={"auto"}
            my={8}
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default createWithApollo({ssr: true})(Index);
