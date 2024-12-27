"use client";
import React, { useDeferredValue } from "react";
import { Badge, Dropdown, Progress } from "flowbite-react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Icon } from "@iconify/react";
import { Table } from "flowbite-react";

import SimpleBar from "simplebar-react";
import { useDashboardStore } from '@/app/store/global';
import { useDiemQuanTrac } from '@/app/query/global';

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
      return "";
  }
}

function derivedStatus(v: number) {
  if (v >= 86 && v <= 100) return "Very good";
  else if (v >= 71 && v <= 85) return "Good";
  else if (v >= 46 && v <= 70) return "Normal";
  else if (v >= 26 && v <= 45) return "Bad";
  else if (v >= 0 && v <= 25) return "Very bad";
  else return "";
}


// Convert the pH value
function calculate_PH_value(ph: number) {
  if (ph < 5.5) {
    return 1;
  } else if (5.5 <= ph && ph < 6.5) {
    return 99 * ph - 543.5;
  } else if (6.5 <= ph && ph < 8.5) {
    return 100;
  } else if (8.5 <= ph && ph < 9.5) {
    return -99 * ph + 941.5;
  } else { // ph >= 9.5
    return 1;
  }
}

// Convert the EC value
function calculate_EC_value(value: number) {
  if (value <= 1500) {
    return 100;
  } else if (1500 < value && value < 4500) {
    return (-0.033 * value + 149.5);
  } else { // value >= 4500
    return 1;
  }
}

// Convert the Dissolved Oxygen (DO) value
function calculate_qDO(DO: number) {
  if (DO <= 3) {
    return 1;
  } else if (3 < DO && DO < 5) {
    return 49.5 * DO - 147.5;
  } else if (5 <= DO && DO < 7) {
    return 100;
  } else if (7 <= DO && DO < 11) {
    return -24.75 * DO - 273.25;
  } else { // DO >= 11
    return 1;
  }
}

// Convert the TSS value
function calculate_qTSS(TSS: number) {
  if (TSS <= 50) {
    return 100;
  } else if (50 < TSS && TSS < 150) {
    return -0.99 * TSS + 149.5;
  } else {
    return 1;
  }
}

// Convert the COD value
function calculate_qCOD(COD: number) {
  if (COD <= 10) {
    return 100;
  } else if (10 < COD && COD < 20) {
    return -9.9 * COD + 199;
  } else { // COD >= 20
    return 1;
  }
}

// Convert the N-NH4 value
function calculate_qNNH4(vl: number) {
  if (vl == 0) return -1
  if (vl <= 0.3) {
    return 100;
  } else if (0.3 < vl && vl < 1.7) {
    return -70.71 * vl + 121.21;
  } else { // N-NH4 >= 1.7
    return 1;
  }
}

// Convert the N-NO2 value
function calculate_qNNO2(vl: number) {
  if (vl <= 0.1) {
    return 100;
  } else if (0.1 < vl && vl < 1) {
    return -111.1 * vl + 111;
  } else { // N-NO2 >= 1
    return 1;
  }
}

// Convert the P-PO4 value
function calculate_qPPO4(vl: number) {
  if (vl <= 0.1) {
    return 100;
  } else if (0.1 < vl && vl < 0.5) {
    return -247.5 * vl + 124.75;
  } else { // P-PO4 >= 0.5
    return 1;
  }
}

// Convert the Aeromonas value
function calculate_qAeromonas(vl: number) {
  if (vl == 0) return -1
  if (vl <= 1000) {
    return 100;
  } else if (1000 < vl && vl < 3000) {
    return -0.0495 * vl + 149.5;
  } else { // Aeromonas >= 3000
    return 1;
  }
}


const PopularProducts = () => {
  const diemQuanTrac = useDashboardStore((state) => state.diemQuanTrac);
  const { data, isLoading } = useDiemQuanTrac(diemQuanTrac)

  const { ph, do: DO, conductivity, n_no2, n_nh4, p_po4, tss, cod, aeromonas_total } = isLoading ? {} : data.data.at(-1)

  const ProductTableData = [
    {
      name: "pH",
      value: ph,
      process: calculate_PH_value(ph),
      statustext: derivedStatus(calculate_PH_value(ph)),
    },
    {
      name: "EC",
      value: conductivity,
      process: calculate_EC_value(conductivity),
      statustext: derivedStatus(calculate_EC_value(conductivity)),
    },
    {
      name: "DO",
      value: DO,
      process: calculate_qDO(DO),
      statustext: derivedStatus(calculate_qDO(DO)),
    },
    {
      name: "NH4",
      value: n_nh4,
      process: calculate_qNNH4(n_nh4),
      statustext: derivedStatus(calculate_qNNH4(n_nh4)),
    },
    {
      name: "NO2",
      value: n_no2,
      process: calculate_qNNO2(n_no2),
      statustext: derivedStatus(calculate_qNNO2(n_no2)),
    },
    {
      name: "PO4",
      value: p_po4,
      process: calculate_qPPO4(p_po4),
      statustext: derivedStatus(calculate_qPPO4(p_po4)),
    },
    {
      name: "TSS",
      value: tss,
      process: calculate_qTSS(tss),
      statustext: derivedStatus(calculate_qTSS(tss)),
    },
    {
      name: "COD",
      value: cod,
      process: calculate_qCOD(cod),
      statustext: derivedStatus(calculate_qCOD(cod)),
    },
    {
      name: "AH",
      value: aeromonas_total,
      process: calculate_qAeromonas(aeromonas_total),
      statustext: derivedStatus(calculate_qAeromonas(aeromonas_total)),
    }
  ];

  const deferredProductTableData = useDeferredValue(ProductTableData)

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
                {deferredProductTableData.map((item, index) => (
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
