import { useAppDispatch, useAuth, useUsername } from "../lib/hooks";
import { deleteContribution } from "../features/contribution-slice";
import { Flex, Paper, Text } from "@mantine/core";
import {
  IconCheck,
  IconNotes,
  IconTag,
  IconTrash,
  IconUser,
  IconX,
} from "@tabler/icons-react";

type ContributionProps = {
  contribution: ContributionType;
};

const Contribution = (parms: ContributionProps) => {
  const contribution = parms.contribution;
  const dispatch = useAppDispatch();

  const username = useUsername(contribution.belongsToId);
  const auth = useAuth();

  const ownsThis = contribution.belongsToId === auth.user!.id;

  function handleDelete() {
    void dispatch(deleteContribution(contribution.id));
  }

  return (
    <Paper withBorder={true} radius="xs" shadow="xs" p="sm" w="100%" m="xs">
      <Flex direction="column" px="md" gap="1px">
        <Flex direction="row" justify="space-between">
          <Flex>
            <IconUser color="gray" />
            <Text size="md" c="gray">
              {username}
            </Text>
          </Flex>
          <div className="text-xl font-bold">Rs {contribution.amount}</div>
        </Flex>
        <Flex gap="2px">
          <IconNotes />
          <Text>{contribution.name}</Text>
        </Flex>
        <Flex justify="space-between">
          <Flex gap="2px">
            <IconTag size={14} />
            <Text fs="italic" size="xs" pb="xs">
              {contribution.type}
            </Text>
          </Flex>
          <Flex gap="md">
            {contribution.passed ? (
              <IconCheck color="teal" />
            ) : (
              <IconX color="pink" />
            )}
            <div className="cursor-pointer" onClick={handleDelete}>
              {ownsThis ? <IconTrash /> : <IconCheck color="green" />}
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  );
};

export default Contribution;
