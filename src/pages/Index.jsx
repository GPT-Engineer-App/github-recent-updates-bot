import React, { useState } from "react";
import { Container, VStack, Input, Button, List, ListItem, Text, Link, Spinner, HStack } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

const Index = () => {
  const [searchText, setSearchText] = useState("");
  const [excludeText, setExcludeText] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=${searchText}+NOT+${excludeText}&sort=updated&order=desc&per_page=10`);
      const data = await response.json();
      setRepos(data.items || []);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
    setLoading(false);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input placeholder="Search Text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          <Input placeholder="Exclude Text" value={excludeText} onChange={(e) => setExcludeText(e.target.value)} />
          <Button onClick={fetchRepos} colorScheme="teal" leftIcon={<FaGithub />}>
            Search
          </Button>
        </HStack>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <List spacing={3} width="100%">
            {repos.map((repo) => (
              <ListItem key={repo.id} borderWidth="1px" borderRadius="lg" padding="4">
                <Link href={repo.html_url} isExternal>
                  <Text fontSize="lg" fontWeight="bold">
                    {repo.name}
                  </Text>
                  <Text>{repo.description}</Text>
                  <Text fontSize="sm" color="gray.500">
                    Updated at: {new Date(repo.updated_at).toLocaleString()}
                  </Text>
                </Link>
              </ListItem>
            ))}
          </List>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
