import { useSelector } from "react-redux";
import AdminStats from "./AdminStats";
import { useGetAdminStatsQuery } from "../../../../redux/features/stats/statsApi";
import Loading from './../../../../components/Loading';
import AdminStatsChart from "./AdminStatsChart";
function AdminDMain() {
  const { user } = useSelector((state) => state.auth);

  const {data: adminData , isLoading ,error} = useGetAdminStatsQuery()

  if(isLoading) return <Loading/>
  if(error) return <div>Failed to fetch Admin Stats data</div>


  const stats = adminData || {}
//   console.log(stats)
  if(!stats) return <div>Failed to fetch Admin Stats data</div>

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
        <p className="text-gray-500">
          Hi, {user?.username} welcome to dashboard
        </p>
      </div>

      <AdminStats stats={stats}/>

      <AdminStatsChart stats={stats}/>
    </div>
  );
}

export default AdminDMain;
