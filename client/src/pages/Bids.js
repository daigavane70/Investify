import { Alert, Badge, Button, Card, Input, Modal, Spin, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Requests } from "../utils";
import { colors } from "../utils/utils";

function BidCard(props) {
  const [data, setdata] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bids, setBids] = useState([]);

  const [bidInvestor, setBidInvestor] = useState("");
  const [bidAmount, setbidAmount] = useState(0);
  const [bidDilution, setBidDilution] = useState(0);

  useEffect(() => {
    setLoading(true);
    Requests.getStartupById(props?.ask?.startupId).then((res) => {
      setdata({ ...res.data, ...props.ask });
      setBids(props?.ask?.bids);
      setLoading(false);
    });
  }, []);

  const addBid = async () => {
    await Requests.addBid({
      _id: props.ask._id,
      bid: {
        investorId: bidInvestor,
        amount: bidAmount,
        dilution: bidDilution,
      },
    }).then((res) => {
      setBids((initial) => [
        ...initial,
        {
          investorId: bidInvestor,
          amount: bidAmount,
          dilution: bidDilution,
        },
      ]);
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
    setBidDilution();
    setbidAmount();
    setBidInvestor("");
  };

  const handleOk = async () => {
    await addBid();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Spin spinning={loading}>
      <Card
        title={
          <div className="flex justify-between">
            <div className=" flex space-x-2 items-center">
              <h1 className="text-xl">{data.name}</h1>
              <div className="flex text-sm font-light "></div>
            </div>
            <Button
              className=" bg-green-400 px-8 rounded-md"
              onClick={showModal}
            >
              Bid
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-3 mb-2">
          <div className="flex space-x-2">
            <div>Ask: </div>
            <div>{data.amount}</div>
          </div>
          <div className="flex space-x-2">
            <div>Dilution: </div>
            <div>{data.dilution} %</div>
          </div>
          <div className="flex space-x-2">
            <div>Valuation:</div>
            <div className="text-blue-500">
              {(parseInt(data.amount) * 100) / parseInt(data.dilution)}
            </div>
          </div>
        </div>
        <div className="flex space-x-2 mb-2">
          <div>Domains: </div>
          {data?.domains?.map((domain, index) => (
            <Tag
              color={colors[Math.floor(Math.random() * colors.length)]}
              key={domain}
            >
              {domain}
            </Tag>
          ))}
        </div>
        <Badge count={bids?.length || 0} className=" w-full">
          {bids?.length > 0 ? (
            <div className="grid grid-cols-3 bg-gray-50 p-4 gap-2">
              <>
                <div className="border-b pb-2 text-cyan-500">Investor</div>
                <div className="border-b pb-2 text-cyan-500">Amount</div>
                <div className="border-b pb-2 text-cyan-500">Dilution</div>
              </>
              {bids?.map((bid) => (
                <>
                  <div>{bid.investorId}</div>
                  <div>{bid.amount}</div>
                  <div>{bid.dilution} %</div>
                </>
              ))}
            </div>
          ) : (
            <Alert message={"No bids for this ask"} type={"error"}></Alert>
          )}
        </Badge>
      </Card>
      <Modal
        title={"Bid for " + data.name}
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <div className="space-y-4">
          <Input
            placeholder="Investor name"
            value={bidInvestor}
            onChange={(e) => setBidInvestor(e.target.value)}
          ></Input>
          <Input
            placeholder="Amount"
            value={bidAmount}
            onChange={(e) => setbidAmount(e.target.value)}
          ></Input>
          <Input
            placeholder="Dilution / Share"
            value={bidDilution}
            onChange={(e) => setBidDilution(e.target.value)}
          ></Input>
          <div className="space-x-2">
            <Button onClick={handleCancel} type="danger text-red-400">
              Cancel
            </Button>
            <Button onClick={handleOk} type=" bg-blue-400">
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </Spin>
  );
}

export default function Bids() {
  const [asks, setasks] = useState([]);

  useEffect(() => {
    let data = [];
    Requests.getAllAsks().then((res) => {
      setasks(res.data);
    });
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold pb-2 border-b text-gray-500">
        Request for fundings
      </h1>
      {asks.map((ask) => (
        <BidCard ask={ask}></BidCard>
      ))}
    </div>
  );
}
