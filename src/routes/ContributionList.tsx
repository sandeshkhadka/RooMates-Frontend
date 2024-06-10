import { useEffect } from "react";
import Contribution from "../components/Contribution";
import { useAppDispatch, useContributions } from "../lib/hooks";
import {
  DraftContribution,
  fetchContribution,
  postContribution,
} from "../features/contribution-slice";
import { Button, Container, Flex, NativeSelect, NumberInput, Paper, ScrollArea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
const ContributionTypes = [
  "vegetables",
  "water",
  "nonVegs",
  "khaja",
  "gas",
  "payments",
  "others",
];

const ContributionList = () => {
  const contributions: ContributionType[] = useContributions();
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(fetchContribution());
  }, [dispatch]);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      amount: "",
      type: "vegetables"
    }
  })
  return (
    <Flex w="100%" gap="2px">
      <ScrollArea flex="2" type="never" h="100vh">
        <Flex direction="column" gap="2px" py="xs" >
          {contributions.map((contrib) => (
            <Contribution contribution={contrib} key={contrib.id} />
          ))}
        </Flex>
      </ScrollArea>
      <Container flex="1">
        <form
          onSubmit={form.onSubmit((values) => {
            const { name, amount, type } = values
            if (name && amount && type) {
              const amountInt = parseInt(amount);
              const draftContribution: DraftContribution = {
                name,
                amount: amountInt,
                type,
              };
              void dispatch(postContribution(draftContribution));
              form.reset()
            }
          })}
        >
          <Paper withBorder={true} shadow="xs" mt="sm" >
            <Flex direction="column" gap="2px" h="fit" m="2px" p="2px">
              <TextInput styles={
                {
                  input: {
                    border: "2px solid lightgray",
                    borderRadius: "0",
                    outline: "none",
                    padding: "4px"
                  }
                }
              }
                name="name" label="Name" p="xs" key={form.key("name")} {...form.getInputProps('name')} />
              <NumberInput
                name="amount"
                p="xs"
                label="Amount"
                key={form.key('amount')}
                styles={
                  {
                    input: {
                      border: "2px solid lightgray",
                      borderRadius: "0",
                      outline: "none",
                      padding: "4px"
                    }
                  }
                }
                {...form.getInputProps("amount")}
              />
              <NativeSelect label="Type" data={ContributionTypes} styles={
                {
                  input: {
                    border: "2px solid lightgray",
                    borderRadius: "0",
                    outline: "none",
                    padding: "4px"
                  }
                }
              }
                p="xs"
                key={form.key('type')} {...form.getInputProps("type")} />

              <Button
                type="submit"
                m="xs"
                styles={
                  {
                    root: {
                      backgroundColor: "#228BE6",
                      color: "white"
                    }
                  }
                }
              >
                Submit
              </Button>
            </Flex>
          </Paper>
        </form>
      </Container>

    </Flex>
  );
};

export default ContributionList;
