contract ERC721 {
  function balanceOf() public view returns (string _balance);
  function ownerOf(bytes username) public view returns (address _owner);
}
