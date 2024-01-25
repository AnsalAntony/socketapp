import React from "react";

const TopBar = ({indexVal= 0, onpress})=>{
 const styles = {
    container: {display:"flex", flexDirection:"row",justifyContent:"center",alignItems:"center", marginTop:20},
    buttonStyle:{height: 50,marginRight:40, justifyContent:"center", alignItems:"center", display:"flex"}
};


    return(
        <div style={styles.container}>
       <button
       onClick={() => {
        onpress(0)
      }}
       style={{ ...styles.buttonStyle, backgroundColor: indexVal === 0 ? "#D2E3C7" : "#EEF0ED" }}>
        <h4>Data From Json Placeholder</h4>
       </button>
       <button
       onClick={() => {
        onpress(1)
      }}
        style={{ ...styles.buttonStyle, backgroundColor: indexVal === 1 ? "#D2E3C7" : "#EEF0ED" }}>
        <h4>Socket Notifications</h4>
       </button>
        </div>
    )

}
export default TopBar;