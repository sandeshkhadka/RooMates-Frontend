import { Flex, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowRight,
} from "@tabler/icons-react";
import classes from "./StatsGrid.module.css";
import { useDashboard, useUsers } from "../lib/hooks";

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};
type SplitMapEntry = {
  id: string;
  amount: number;
}
type SplitMap = {
  userId: string;
  splits: SplitMapEntry[];
}
function splitContribution(leaderboard: ContributionLeaderboardType) {
  let splitmap: SplitMap[] = []
  leaderboard.forEach((user, index) => {
    leaderboard.forEach((friend) => {
      let difference = user.amount - friend.amount;
      if (difference > 0) {
        if (splitmap[index]) {
          splitmap[index].splits.push({
            id: friend.userId,
            amount: difference / 4
          })
        } else {
          splitmap.push(
            {
              userId: user.userId,
              splits: [{
                id: friend.userId,
                amount: difference / 4
              }]
            }
          )
        }
      }
    })
  }
  )
  return splitmap;
}
export function ContributionSplits() {
  const userList = useUsers();
  function resolveUsername(id: string) {
    const user = userList.find((item) => item.id == id);
    return user?.username;
  }
  const dashboard = useDashboard()
  const contributions = dashboard.leaderboards.contribution;
  const splits = splitContribution(contributions)
  return (

    <Paper shadow="xs" p="md" radius="md" key={"split"}>
      <Text size="md" c="dimmed" ta="center" className={classes.title}>
        Split
      </Text>

      <Flex direction={"column"}>
        {splits.map((split) => {
          return (
            <Flex direction={"column"} key={split.userId}>
              {split.splits.map((sp) => (
                <Flex key={sp.id}>
                  <Text c="pink"> {resolveUsername(sp.id)} </Text> <IconArrowRight /> <Text c="green">{resolveUsername(split.userId)}  Rs {sp.amount}</Text>
                </Flex>
              ))}
            </Flex>
          )
        })}
        <Text className={classes.value} size="34px">

        </Text>
      </Flex>
    </Paper>
  );
}

export default ContributionSplits;
