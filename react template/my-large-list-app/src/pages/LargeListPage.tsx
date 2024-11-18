// import { useEffect } from 'react';
// import VirtualizedList from '@/components/VirtualizedList';
// import { useListStore } from '@/hooks/useListStore';

// const LargeListPage = () => {
//   const { fetchItems } = useListStore();

//   useEffect(() => {
//     fetchItems();
//   }, [fetchItems]);

//   return (
//     <div>
//       <h1>Large List</h1>
//       <VirtualizedList />
//     </div>
//   );
// };

// export default LargeListPage;




import { useEffect } from 'react';
import VirtualizedList from '@/components/VirtualizedList';
import Tooltip from '@/components/tooltip/Toltip';
import PieChartWithCustomizedLabel from "@/components/recharts/piechart/PieChart";
import GoogleMapWithAutocomplete from "@/components/googlemaps/GoogleMapWithAutocomplete"

const LargeListPage = () => {
  //const { fetchItems } = useListStore();

  useEffect(() => {
    //fetchItems();
  }, []);

  return (
    <div style={{display:"flex",width:"100vw",flexDirection:"column",marginTop:"3.5rem",alignItems:"center"}}>
      <Tooltip />
       <PieChartWithCustomizedLabel/>
      <GoogleMapWithAutocomplete />
      <hr style={{backgroundColor:"black",fontSize:"4rem",width:"100%",marginTop:"2rem"}}/>
      <h1>Large List</h1>
      <VirtualizedList />
    </div>
  );
};

export default LargeListPage;


