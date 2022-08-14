import { Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Requests } from "../utils";
import { colors } from "../utils/utils";

export default function AllStartups() {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Founded",
      dataIndex: "founded",
      key: "founded",
    },
    {
      title: "Founder",
      dataIndex: "founder",
      key: "founder",
    },
    {
      title: "Domains",
      dataIndex: "domains",
      key: "domains",
      render: (_, { domains }) => {
        return domains?.map((domain, index) => (
          <Tag
            color={colors[Math.floor(Math.random() * colors.length)]}
            key={domain}
          >
            {domain}
          </Tag>
        ));
      },
    },
  ];

  useEffect(() => {
    Requests.getAllStartups().then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="space-y-2">
      <h1 className="text-xl font-bold pb-2 border-b text-gray-500">
        All Startups
      </h1>
      <Table columns={columns} dataSource={data}></Table>
    </div>
  );
}
