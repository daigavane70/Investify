import { Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { colors } from "../utils/utils";

export default function AllStartups() {
  const [data, setData] = useState([
    {
      name: "Slice",
      founded: "2011",
      founder: "Rajan Bajaj",
      domains: ["Fin-Tech", "Ed-Tech"],
    },
    {
      name: "Upstox",
      founded: "2011",
      founder: "RKSV",
      domains: ["Fin-Tech", "Stock Market"],
    },
    {
      name: "Zerodha",
      founded: "2010",
      founder: "Nitin Kamath",
      domains: ["Stock Market", "Digital Brocker", "Ed-Tech"],
    },
    {
      name: "Byjus",
      founded: "2011",
      founder: "Rajan Bajaj",
      domains: ["Ed-Tech"],
    },
    {
      name: "Unacademy",
      founded: "--",
      founder: "Rajan Bajaj",
      domains: ["Fin-Tech", "Ed-Tech"],
    },
    {
      name: "Ola",
      founded: "2011",
      founder: "Ankit Bhati",
      domains: ["Taxi Booking", "Travel"],
    },
    {
      name: "BharatPe",
      founded: "2015",
      founder: "Ashneer Grover",
      domains: ["Fin-Tech"],
    },
    {
      name: "Swiggy",
      founded: "2015",
      founder: "--",
      domains: ["Food Delivery"],
    },
    {
      name: "Upstox",
      founded: "2011",
      founder: "RKSV",
      domains: ["Fin-Tech", "Stock Market"],
    },
    {
      name: "Zerodha",
      founded: "2010",
      founder: "Nitin Kamath",
      domains: ["Stock Market", "Digital Brocker", "Ed-Tech"],
    },
    {
      name: "Byjus",
      founded: "2011",
      founder: "Rajan Bajaj",
      domains: ["Ed-Tech"],
    },
    {
      name: "Unacademy",
      founded: "--",
      founder: "Rajan Bajaj",
      domains: ["Fin-Tech", "Ed-Tech"],
    },
    {
      name: "Ola",
      founded: "2011",
      founder: "Ankit Bhati",
      domains: ["Taxi Booking", "Travel"],
    },
    {
      name: "BharatPe",
      founded: "2015",
      founder: "Ashneer Grover",
      domains: ["Fin-Tech"],
    },
    {
      name: "Swiggy",
      founded: "2015",
      founder: "--",
      domains: ["Food Delivery"],
    },
  ]);
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
  return (
    <div>
      <Table columns={columns} dataSource={data}></Table>
    </div>
  );
}
