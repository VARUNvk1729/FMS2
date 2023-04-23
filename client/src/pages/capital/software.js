//import "antd/dist/antd.css";
import "./stylingtable.css";
import { Button, Table, Modal, Input } from "antd";
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
//import { json } from "body-parser";

function Software() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addingExp, setAddingExp] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const apiCall = async () => {
    console.log("called apicall");
    const response = await fetch(`http://localhost:8000/capital/software`);
    const jsonData = await response.json();
    console.log("got data from api");
    console.log(jsonData);
    setDataSource(jsonData);
  };
  useEffect(() => {
    console.log("rendered in useeffect hook");
    apiCall();
  }, []);
  const columns = [
    {
      key: "0",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "1",
      title: "Item",
      dataIndex: "item",
    },
    {
      key: "2",
      title: "Country",
      dataIndex: "country",
    },
    {
      key: "3",
      title: "cost",
      dataIndex: "cost",
    },
    {
      key: "4",
      title: "dop",
      dataIndex: "dop",
    },
    {
      key: "5",
      title: "usd",
      dataIndex: "usd",
    },
    {
      key: "6",
      title: "Aop India",
      dataIndex: "aopindia",
    },
    {
      key: "7",
      title: "Aop Us",
      dataIndex: "aopus",
    },
    {
      key: "8",
      title: "Aop AUS",
      dataIndex: "aopaus",
    },
    {
      key: "9",
      title: "Notes:",
      dataIndex: "notes",
    },
    {
      key: "10",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddExpense = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newStudent = {
      id: randomNumber,
      name: "Name " + randomNumber,
      email: randomNumber + "@gmail.com",
      address: "Address " + randomNumber,
    };
    setDataSource((pre) => {
      return [...pre, newStudent];
    });
  };
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        fetch(`http://localhost:8000/capital/software/deleteRow/${record.id}`, {
          method: "DELETE",
        }).then(() => {
          setDataSource((pre) => {
            return pre.filter((student) => student.id !== record.id);
          });
        });
      },
    });
  };
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };

  const onAddingExp = (record) => {
    setIsAdding(true);
    setAddingExp({ ...record });
  };
  const resetExpense = () => {
    setIsAdding(false);
    setAddingExp(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={onAddingExp}>Add a new Student</Button>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit Student"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((student) => {
                if (student.id === editingStudent.id) {
                  let ob = {
                    item: "",
                    country: "",
                    cost: 0,
                    dop: "01-01-1997",
                    usd: 0,
                    aopindia: 0,
                    aopus: 0,
                    aopaus: 0,
                    notes: "",
                  };
                  ob.item = editingStudent.item;
                  ob.id = editingStudent.id;
                  ob.country = editingStudent.country;
                  ob.cost = editingStudent.cost;
                  ob.dop = editingStudent.dop;
                  ob.usd = editingStudent.usd;
                  ob.aopindia =
                    editingStudent.aopindia === undefined
                      ? 0
                      : editingStudent.aopindia;
                  ob.aopus =
                    editingStudent.aopus === undefined
                      ? 0
                      : editingStudent.aopus;
                  ob.aopaus =
                    editingStudent.aopaus === undefined
                      ? 0
                      : editingStudent.aopaus;
                  ob.notes =
                    editingStudent.notes === undefined
                      ? ""
                      : editingStudent.notes;
                  console.log(ob);

                  fetch(
                    `http://localhost:8000/capital/software/updateRow/${student.id}`,
                    {
                      method: "PUT",
                      body: JSON.stringify(ob),
                      headers: {
                        "content-type": "application/json",
                      },
                    }
                  ).then();
                  return editingStudent;
                } else {
                  return student;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingStudent?.item}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, item: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.country}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, country: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.cost}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, cost: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.dop}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, dop: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.usd}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, usd: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.aopindia}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, aopindia: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.aopus}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, aopus: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.aopaus}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, aopaus: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.notes}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, notes: e.target.value };
              });
            }}
          />
        </Modal>
        <Modal
          title="Add A Expense"
          visible={isAdding}
          okText="Save"
          onCancel={() => {
            resetExpense();
          }}
          onOk={() => {
            const randomNumber = parseInt(Math.random() * 1000);
            let ob = {
              item: "",
              country: "",
              cost: 0,
              dop: "01-01-1997",
              usd: 0,
              aopindia: 0,
              aopus: 0,
              aopaus: 0,
              notes: "",
            };
            ob.item = addingExp.item;
            ob.id = randomNumber;
            ob.country = addingExp.country;
            ob.cost = addingExp.cost;
            ob.dop = addingExp.dop;
            ob.usd = addingExp.usd;
            ob.aopindia =
              addingExp.aopindia === undefined ? 0 : addingExp.aopindia;
            ob.aopus = addingExp.aopus === undefined ? 0 : addingExp.aopus;
            ob.aopaus = addingExp.aopaus === undefined ? 0 : addingExp.aopaus;
            ob.notes = addingExp.notes === undefined ? "" : addingExp.notes;
            console.log(ob);
            fetch("http://localhost:8000/capital/software/addRow/", {
              method: "POST",
              body: JSON.stringify(ob),
              headers: {
                "content-type": "application/json",
              },
            }).then();
            setDataSource((pre) => {
              console.log({ ...pre, addingExp });
              return [...pre, addingExp];
            });
            resetExpense();
          }}
        >
          <Input
            value={addingExp?.item}
            onChange={(e) => {
              setAddingExp((pre) => {
                return { ...pre, item: e.target.value };
              });
            }}
          />
          <Input
            value={addingExp?.country}
            onChange={(e) => {
              setAddingExp((pre) => {
                return { ...pre, country: e.target.value };
              });
            }}
          />
          <Input
            value={addingExp?.cost}
            onChange={(e) => {
              setAddingExp((pre) => {
                return { ...pre, cost: e.target.value };
              });
            }}
          />
          <Input
            value={addingExp?.dop}
            onChange={(e) => {
              setAddingExp((pre) => {
                return { ...pre, dop: e.target.value };
              });
            }}
          />
          <Input
            value={addingExp?.usd}
            onChange={(e) => {
              setAddingExp((pre) => {
                return { ...pre, usd: e.target.value };
              });
            }}
          />
          <Input
            value={addingExp?.aopindia}
            onChange={(e) => {
              setAddingExp((pre) => {
                return { ...pre, aopindia: e.target.value };
              });
            }}
          />
          <Input
            value={addingExp?.aopus}
            onChange={(e) => {
              setAddingExp((pre) => {
                return { ...pre, aopus: e.target.value };
              });
            }}
          />
          <Input
            value={addingExp?.aopaus}
            onChange={(e) => {
              setAddingExp((pre) => {
                return { ...pre, aopaus: e.target.value };
              });
            }}
          />
          <Input
            value={addingExp?.notes}
            onChange={(e) => {
              setAddingExp((pre) => {
                return { ...pre, notes: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}

export default Software;
