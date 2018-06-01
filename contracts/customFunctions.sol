pragma solidity ^0.4.23;

contract StringFeature {
	/**
	* @dev Adds two strings, throws on overflow.
	*/
	function addString(string a, string b) internal pure returns (string) {
	    bytes memory _ba = bytes(a);
	    bytes memory _bb = bytes(b);
	    string memory ab = new string(_ba.length + _bb.length);
	    bytes memory ba = bytes(ab);
	    uint k = 0;
	    for (uint i = 0; i < _ba.length; i++) ba[k++] = _ba[i];
	    for (i = 0; i < _bb.length; i++) ba[k++] = _bb[i];
	    return string(ba);
	}

	function uint2str(uint i) internal pure returns (string){
	    if (i == 0) return "0";
	    uint j = i;
	    uint length;
	    while (j != 0){
	        length++;
	        j /= 10;
	    }
	    bytes memory bstr = new bytes(length);
	    uint k = length - 1;
	    while (i != 0){
	        bstr[k--] = byte(48 + i % 10);
	        i /= 10;
	    }
	    return string(bstr);
	}
}