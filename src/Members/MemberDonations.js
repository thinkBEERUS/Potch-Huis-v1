function MemberDonations() {
  const data = document.cookie;
  const user = data.split("=")[2];
  if (user.endsWith("ADM")) {
    return <div>Admin</div>;
  } else {
    return <div>User</div>;
  }
}

export default MemberDonations;
