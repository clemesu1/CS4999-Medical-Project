// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.6.0;

contract PatientRecord {
  uint public recordCount = 0;

  struct Record {
    uint id;
    string content;
  }

  mapping(uint => Record) public records;

  event RecordCreated(
    uint id,
    string content
  );

  constructor() public {
    createRecord("Start of Medical Records.");
  }

  function createRecord(string memory _content) public {
    recordCount++;
    records[recordCount] = Record(recordCount, _content);
    emit RecordCreated(recordCount, _content);
  }

}
