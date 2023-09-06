export const dummyContriResponse = {
  contributions: [
    {
      id: "7f3e2c4c-65c8-4854-9cb3-da626a4c9bd9",
      name: "jar",
      type: "water",
      amount: 100,
      belongsToId: "78b9f7d0-27b7-4fe0-8a96-d01a85d3590a",
      createdAt: "2023-08-15T14:06:22.842Z",
      approvedBy: ["sandesh2"],
      passed: false,
    },
    {
      id: "515ecf67-b9d1-4004-a18c-c5449ac88e71",
      name: "masu",
      type: "nonVegs",
      amount: 200,
      belongsToId: "184d396c-f7f2-412c-8686-7837e3a4132f",
      createdAt: "2023-08-15T11:54:56.773Z",
      approvedBy: ["sandesh", "sandesh2"],
      passed: true,
    },
    {
      id: "90b0f1ab-dde3-4bac-9805-e7c87a8b430d",
      name: "kokakola",
      type: "water",
      amount: 100,
      belongsToId: "f15ea14a-c225-48e9-9817-63abf4a6744a",
      createdAt: "2023-08-15T14:12:20.830Z",
      approvedBy: ["third", "sandesh", "sandesh2"],
      passed: true,
    },
  ],
};
export const dummyTaskResponse = {
  tasks: [
    {
      id: "1823c5fe-0a9b-4b0f-b8b8-57da2981c836",
      name: "another",
      schedule: "2023-08-14T18:21:12.477Z",
      belongsToId: "184d396c-f7f2-412c-8686-7837e3a4132f",
      status: "Pending",
    },
    {
      id: "38882489-49e7-4342-8804-a1d6c9753191",
      name: "another thooor",
      schedule: "2023-08-14T18:21:25.292Z",
      belongsToId: "184d396c-f7f2-412c-8686-7837e3a4132f",
      status: "Pending",
    },
  ],
};
export const dummyUserResponse = {
  users: [
    {
      username: "sandesh",
      id: "184d396c-f7f2-412c-8686-7837e3a4132f",
      tasks: [
        {
          id: "1823c5fe-0a9b-4b0f-b8b8-57da2981c836",
          name: "another",
          schedule: "2023-08-14T18:21:12.477Z",
          belongsToId: "184d396c-f7f2-412c-8686-7837e3a4132f",
          status: "Pending",
        },
        {
          id: "38882489-49e7-4342-8804-a1d6c9753191",
          name: "another thooor",
          schedule: "2023-08-14T18:21:25.292Z",
          belongsToId: "184d396c-f7f2-412c-8686-7837e3a4132f",
          status: "Pending",
        },
        {
          id: "91f0533f-83f7-43cc-842d-de71b7e6f003",
          name: "Completed",
          schedule: "2023-08-14T18:19:33.708Z",
          belongsToId: "184d396c-f7f2-412c-8686-7837e3a4132f",
          status: "Completed",
        },
      ],
    },
    {
      username: "sandesh2",
      id: "78b9f7d0-27b7-4fe0-8a96-d01a85d3590a",
      tasks: [],
    },
    {
      username: "third",
      id: "f15ea14a-c225-48e9-9817-63abf4a6744a",
      tasks: [],
    },
  ],
};
