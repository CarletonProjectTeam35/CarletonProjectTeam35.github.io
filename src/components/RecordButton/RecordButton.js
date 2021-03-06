import React, { Component } from "react";
import Switch from "react-switch";
import { db } from "../../firebase";
//import Modal from "react-modal";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class RecordButton extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      dataPointEmg0: [],
      dataPointEmg1: [],
      dataPointEmg2: [],
      dataPointEmg3: [],
      dataPointEmg4: [],
      dataPointEmg5: [],
      dataTimeEmg: [],
      dataPointGyro: [],
      dataTimeGyro: [],
      dataPointPressure0: [],
      dataPointPressure1: [],
      dataTimePressure: [],
      modalOpened: false,
      isOpen: false,
      name: "",
      notes: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  handleSubmit = () => {
    this.setState({ isOpen: false });
    console.log(this.state.notes);
    db.collection("Prod-Data").add({
      switchModeHockey: sessionStorage.getItem("SwitchModeHockey"),
      switchModeTraining: sessionStorage.getItem("SwitchModeTraining"),
      drill: sessionStorage.getItem("Drill"),
      participant: sessionStorage.getItem("Participant"),
      notes: this.state.notes,
      data: {
        EmgData: {
          emg1: JSON.parse(sessionStorage.getItem("EmgData0")),
          emg2: JSON.parse(sessionStorage.getItem("EmgData1")),
          emg3: JSON.parse(sessionStorage.getItem("EmgData2")),
          emg4: JSON.parse(sessionStorage.getItem("EmgData3")),
          emg5: JSON.parse(sessionStorage.getItem("EmgData4")),
          emg6: JSON.parse(sessionStorage.getItem("EmgData5")),
          emgTime: JSON.parse(sessionStorage.getItem("EmgTime")),
        },
        GyroData: {
          gyro: JSON.parse(sessionStorage.getItem("GyroData")),
          gyroTime: JSON.parse(sessionStorage.getItem("GyroTime")),
        },
        PressureData: {
          pressurePoint1: JSON.parse(sessionStorage.getItem("PressureData0")),
          pressurePoint2: JSON.parse(sessionStorage.getItem("PressureData1")),
          pressureTime: JSON.parse(sessionStorage.getItem("PressureTime")),
        },
      },
    });
    db.collection("Prod-Backup").add({
      switchModeHockey: sessionStorage.getItem("SwitchModeHockey"),
      switchModeTraining: sessionStorage.getItem("SwitchModeTraining"),
      drill: sessionStorage.getItem("Drill"),
      participant: sessionStorage.getItem("Participant"),
      notes: this.state.notes,
      data: {
        EmgData: {
          emg1: JSON.parse(sessionStorage.getItem("EmgData0")),
          emg2: JSON.parse(sessionStorage.getItem("EmgData1")),
          emg3: JSON.parse(sessionStorage.getItem("EmgData2")),
          emg4: JSON.parse(sessionStorage.getItem("EmgData3")),
          emg5: JSON.parse(sessionStorage.getItem("EmgData4")),
          emg6: JSON.parse(sessionStorage.getItem("EmgData5")),
          emgTime: JSON.parse(sessionStorage.getItem("EmgTime")),
        },
        GyroData: {
          gyro: JSON.parse(sessionStorage.getItem("GyroData")),
          gyroTime: JSON.parse(sessionStorage.getItem("GyroTime")),
        },
        PressureData: {
          pressurePoint1: JSON.parse(sessionStorage.getItem("PressureData0")),
          pressurePoint2: JSON.parse(sessionStorage.getItem("PressureData1")),
          pressureTime: JSON.parse(sessionStorage.getItem("PressureTime")),
        },
      },
    });
  };
  toggleModal() {
    this.setState((prevState) => ({ modalOpened: !prevState.modalOpened }));
  }
  componentDidMount() {
    const storedValue = sessionStorage.getItem("RecordMode");
    if (storedValue === "Recording") {
      this.setState({ checked: true });
      this.handleChange(true);
    } else if (storedValue === "NotRecording") {
      this.setState({ checked: false });
    }
  }
  handleChange(checked) {
    this.setState({ checked });
    if (sessionStorage.getItem("EmgData0") != null) {
      this.setState({
        dataPointEmg0: JSON.parse(sessionStorage.getItem("EmgData0")),
      });
      this.setState({
        dataPointEmg1: JSON.parse(sessionStorage.getItem("EmgData1")),
      });
      this.setState({
        dataPointEmg2: JSON.parse(sessionStorage.getItem("EmgData2")),
      });
      this.setState({
        dataPointEmg3: JSON.parse(sessionStorage.getItem("EmgData3")),
      });
      this.setState({
        dataPointEmg4: JSON.parse(sessionStorage.getItem("EmgData4")),
      });
      this.setState({
        dataPointEmg5: JSON.parse(sessionStorage.getItem("EmgData5")),
      });
      this.setState({
        dataTimeEmg: JSON.parse(sessionStorage.getItem("EmgTime")),
      });
    }
    if (sessionStorage.getItem("GyroData") != null) {
      this.setState({
        dataPointGyro: JSON.parse(sessionStorage.getItem("GyroData")),
      });
      this.setState({
        dataTimeGyro: JSON.parse(sessionStorage.getItem("GyroTime")),
      });
    }
    if (sessionStorage.getItem("PressureData0") != null) {
      this.setState({
        dataPointPressure0: JSON.parse(sessionStorage.getItem("PressureData0")),
      });
      this.setState({
        dataPointPressure1: JSON.parse(sessionStorage.getItem("PressureData1")),
      });
      this.setState({
        dataTimePressure: JSON.parse(sessionStorage.getItem("PressureTime")),
      });
    }
    if (sessionStorage.getItem("DataCleared") == 1) {
      sessionStorage.setItem("DataCleared", 0);
      this.setState({ dataPointEmg0: [] });
      this.setState({ dataPointEmg1: [] });
      this.setState({ dataPointEmg2: [] });
      this.setState({ dataPointEmg3: [] });
      this.setState({ dataPointEmg4: [] });
      this.setState({ dataPointEmg5: [] });
      this.setState({ dataTimeEmg: [] });
      this.setState({ dataPointGyro: [] });
      this.setState({ dataTimeGyro: [] });
      this.setState({ dataPointPressure0: [] });
      this.setState({ dataPointPressure1: [] });
      this.setState({ dataTimePressure: [] });
    }
    let tempTimeEmg;
    let tempTimeGyro;
    let tempTimePressure;
    if (checked) {
      if (
        sessionStorage.getItem("SwitchModeHockey") == null ||
        sessionStorage.getItem("SwitchModeTraining") == null ||
        sessionStorage.getItem("Drill") == null ||
        sessionStorage.getItem("Participant") == null
      ) {
        alert(
          "Please fill in all settings for recording before pressing the record button."
        );
        this.setState({ checked: false });
      } else {
        sessionStorage.setItem("RecordMode", "Recording");
        this.interval = setInterval(() => {
          fetch(
            "https://api.thingspeak.com/channels/1636837/feeds.json?api_key=3AGBX7JRF6XLVEBB&results=1"
          )
            .then((response) => response.json())
            .then((data) => data.feeds)
            .then((newData) => {
              console.log(newData);
              tempTimeEmg = new Date(newData[0].created_at).toString();
              if (
                this.state.dataTimeEmg.length == 0 ||
                tempTimeEmg.substring(tempTimeEmg, tempTimeEmg.length - 32) !=
                  this.state.dataTimeEmg[this.state.dataTimeEmg.length - 1]
              ) {
                this.setState({
                  dataPointEmg0: this.state.dataPointEmg0.concat(
                    newData[0].field1
                  ),
                });
                this.setState({
                  dataPointEmg1: this.state.dataPointEmg1.concat(
                    newData[0].field2
                  ),
                });
                this.setState({
                  dataPointEmg2: this.state.dataPointEmg2.concat(
                    newData[0].field3
                  ),
                });
                this.setState({
                  dataPointEmg3: this.state.dataPointEmg3.concat(
                    newData[0].field4
                  ),
                });
                this.setState({
                  dataPointEmg4: this.state.dataPointEmg4.concat(
                    newData[0].field5
                  ),
                });
                this.setState({
                  dataPointEmg5: this.state.dataPointEmg5.concat(
                    newData[0].field6
                  ),
                });

                this.setState({
                  dataTimeEmg: this.state.dataTimeEmg.concat(
                    tempTimeEmg.substring(tempTimeEmg, tempTimeEmg.length - 32)
                  ),
                });

                sessionStorage.setItem(
                  "EmgData0",
                  JSON.stringify(this.state.dataPointEmg0)
                );
                sessionStorage.setItem(
                  "EmgData1",
                  JSON.stringify(this.state.dataPointEmg1)
                );
                sessionStorage.setItem(
                  "EmgData2",
                  JSON.stringify(this.state.dataPointEmg2)
                );
                sessionStorage.setItem(
                  "EmgData3",
                  JSON.stringify(this.state.dataPointEmg3)
                );
                sessionStorage.setItem(
                  "EmgData4",
                  JSON.stringify(this.state.dataPointEmg4)
                );
                sessionStorage.setItem(
                  "EmgData5",
                  JSON.stringify(this.state.dataPointEmg5)
                );
                sessionStorage.setItem(
                  "EmgTime",
                  JSON.stringify(this.state.dataTimeEmg)
                );
              }
            });
          fetch(
            "https://api.thingspeak.com/channels/1640107/feeds.json?api_key=YRZNK03F5KTVUWT9&results=1"
          )
            .then((response) => response.json())
            .then((data) => data.feeds)
            .then((newData) => {
              tempTimeGyro = new Date(newData[0].created_at).toString();
              if (
                this.state.dataTimeGyro.length == 0 ||
                tempTimeGyro.substring(
                  tempTimeGyro,
                  tempTimeGyro.length - 32
                ) != this.state.dataTimeGyro[this.state.dataTimeGyro.length - 1]
              ) {
                this.setState({
                  dataPointGyro: this.state.dataPointGyro.concat(
                    newData[0].field1
                  ),
                });

                this.setState({
                  dataTimeGyro: this.state.dataTimeGyro.concat(
                    tempTimeGyro.substring(
                      tempTimeGyro,
                      tempTimeGyro.length - 32
                    )
                  ),
                });

                sessionStorage.setItem(
                  "GyroData",
                  JSON.stringify(this.state.dataPointGyro)
                );
                sessionStorage.setItem(
                  "GyroTime",
                  JSON.stringify(this.state.dataTimeGyro)
                );
              }
            });
          fetch(
            "https://api.thingspeak.com/channels/1640109/feeds.json?api_key=BOJ7IY29B1Y04Y7M&results=1"
          )
            .then((response) => response.json())
            .then((data) => data.feeds)
            .then((newData) => {
              tempTimePressure = new Date(newData[0].created_at).toString();
              if (
                this.state.dataTimePressure.length == 0 ||
                tempTimePressure.substring(
                  tempTimePressure,
                  tempTimePressure.length - 32
                ) !=
                  this.state.dataTimePressure[
                    this.state.dataTimePressure.length - 1
                  ]
              ) {
                this.setState({
                  dataPointPressure0: this.state.dataPointPressure0.concat(
                    newData[0].field1
                  ),
                });
                this.setState({
                  dataPointPressure1: this.state.dataPointPressure1.concat(
                    newData[0].field2
                  ),
                });

                this.setState({
                  dataTimePressure: this.state.dataTimePressure.concat(
                    tempTimePressure.substring(
                      tempTimePressure,
                      tempTimePressure.length - 32
                    )
                  ),
                });

                sessionStorage.setItem(
                  "PressureData0",
                  JSON.stringify(this.state.dataPointPressure0)
                );
                sessionStorage.setItem(
                  "PressureData1",
                  JSON.stringify(this.state.dataPointPressure1)
                );
                sessionStorage.setItem(
                  "PressureTime",
                  JSON.stringify(this.state.dataTimePressure)
                );
              }
            });
        }, 2000);
      }
    } else if (!checked) {
      this.setState({ isOpen: true });
      sessionStorage.setItem("RecordMode", "NotRecording");
      clearInterval(this.interval);
    }
  }

  closeModal = () => this.setState({ isOpen: false });

  render() {
    // Modal.setAppElement("#root");
    const customStyles = {
      content: {
        height: "25%",
        width: "50%",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    };
    return (
      <div
        style={{
          padding: 20,
        }}
      >
        <label htmlFor="material-switch">
          <Switch
            checked={this.state.checked}
            onChange={this.handleChange}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
        </label>
        {/* <Modal
          style={customStyles}
          // className={{ base: [style.base] }}
          //  overlayClassName={{ base: [style.overlayBase] }}
          isOpen={this.state.modalOpened}
          onRequestClose={this.toggleModal}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h1 style={{ marginBottom: 20 }}>Add a note to your recording:</h1>
            <a
              style={{
                cursor: "pointer",
                marginLeft: "auto",
                fontSize: "2rem",
              }}
              className="fas fa-times"
              onClick={this.toggleModal}
            ></a>
          </div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <textarea
                style={{ height: "100%", width: "90%", fontSize: 20 }}
                name="notes"
                rows="5"
                ref={(node) => (this.inputNode = node)}
              />
            </label>
            <button
              style={{ backgroundColor: "#666bf4", width: 200, height: 40 }}
              type="submit"
            >
              Add note to recording
            </button>
          </form>{" "}
        </Modal> */}
        <Modal
          show={this.state.isOpen}
          onHide={() => this.handleSubmit()}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Recording Notes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Recording Notes:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                onChange={(e) => this.setState({ notes: e.target.value })}
                placeholder="Inputs notes here"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              onClick={() => this.handleSubmit()}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default RecordButton;
