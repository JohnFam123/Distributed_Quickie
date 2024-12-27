"use client";
import React from "react";
import { Badge, Dropdown, Progress } from "flowbite-react";
import { HiOutlineDotsVertical  } from "react-icons/hi";
import { Icon } from "@iconify/react";
import { Table } from "flowbite-react";

import product1 from "/public/images/products/s1.jpg";
import product2 from "/public/images/products/s2.jpg";
import product3 from "/public/images/products/s3.jpg";
import product4 from "/public/images/products/s4.jpg";
import product5 from "/public/images/products/s5.jpg";
import Image from "next/image";
import SimpleBar from "simplebar-react";
import { valuesIn } from "lodash";

const getStatusColor = (status: any) => {
  switch (status) {
    case "Very good":
      return "primary";
    case "Good":
      return "success";
    case "Normal":
      return "warning";
    case "Bad":
      return "secondary";
    case "Very bad":
      return "error";
    default:
      return "white";
  }
}

const PopularProducts = () => {
  const ProductTableData = [
    {
      name: "pH",
      value: 7,
      process: 100,
      statustext: "Very good",
    },
    {
      name: "EC",
      value: 7,
      process: 80,
      statustext: "Good",
    },
    {
      name: "DO",
      value: 10,
      process: 50,
      statustext: "Normal",
    },
    {
      name: "NH4",
      value: 20,
      process: 30,
      statustext: "Bad",
    },
    {
      name: "NO2",
      value: 30,
      process: 10,
      statustext: "Very bad",
    },
    {
      name: "PO4",
      value: 40,
      process: 10,
      statustext: "Very bad",
    },
    {
      name: "TSS",
      value: 60,
      process: 10,
      statustext: "Very bad",
    },
    {
      name: "COD",
      value: 80,
      process: 10,
      statustext: "Very bad",
    },
    {
      name: "AH",
      value: 20000,
      process: 10,
      statustext: "Very bad",
    }
    
  ];

  /*Table Action*/
  const tableActionData = [
    {
      icon: "solar:add-circle-outline",
      listtitle: "Add",
    },
    {
      icon: "solar:pen-new-square-broken",
      listtitle: "Edit",
    },
    {
      icon: "solar:trash-bin-minimalistic-outline",
      listtitle: "Delete",
    },
  ];

  return (
    <>
      <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray py-6 px-0 relative w-full break-words">
        <div className="px-6">
          <h5 className="card-title">Real time element stats</h5>
        </div>
        <SimpleBar className="max-h-[700px]">
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="p-6">Element</Table.HeadCell>
                <Table.HeadCell>Value/WQI </Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-border dark:divide-darkborder ">
                {ProductTableData.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.Cell className="whitespace-nowrap ps-6">
                      <div className="flex gap-3 items-center">
                        <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">{item.name}</h6>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <h5 className="text-base text-wrap text-center">
                        {item.value}
                      </h5>
                      <div className="me-5">
                        <Progress
                          progress={item.process}

                          size={"sm"}
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge color={`${getStatusColor(item.statustext)}`}>
                        {item.statustext}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        label=""
                        dismissOnClick={false}
                        renderTrigger={() => (
                          <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                            <HiOutlineDotsVertical size={22} />
                          </span>
                        )}
                      >
                        {tableActionData.map((items, index) => (
                          <Dropdown.Item key={index} className="flex gap-3">
                            {" "}
                            <Icon icon={`${items.icon}`} height={18} />
                            <span>{items.listtitle}</span>
                          </Dropdown.Item>
                        ))}
                      </Dropdown>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </SimpleBar>
      </div>
    </>
  );
};

export default PopularProducts;
