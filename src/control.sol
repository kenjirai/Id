pragma solidity ^0.4.23;

contract DeployTest {
    
    //Let the user sign the data
    //Recover the address from the given hash
    
    //record the user address and message recordHash
    struct details {
        string name;
        uint phoneNumber;
        string signature;
    }
    
    mapping(address => details) public entryRecord;
        
        function recordInfo(address sender, string name, uint phoneNumber, string signature) public {
            entryRecord[sender].name = name;
            entryRecord[sender].phoneNumber = phoneNumber;
            entryRecord[sender].signature= signature;
        }
        
        
    function getSig(address user) public view returns(string) {
        return entryRecord[user].signature;
    }
    
    function getName(address user) public view returns(string) {
        return entryRecord[user].name;
    }
    
}