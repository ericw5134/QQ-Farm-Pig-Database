var pc = new PiggyController();

var ID = 0;

function constructTable(){ 
    var data = JSON.parse(localStorage.pigArray);
    if (data != undefined){
        for (let i = 0; i < data.length; i++) {
            data[i].ID = i;
        }
        localStorage.clear();     
        localStorage.setItem('pigArray', JSON.stringify(data));
        var mainTable = document.querySelector("#main-table") as HTMLTableElement;
        for (let i = 0; i < data.length; i++){
            var tr = mainTable!.insertRow(-1);
            tr.id = "row" + String(i+3);
        
            // 1st cell for name
            var cell_name = tr!.insertCell(0);
            let name_node = document.createElement("article");
            name_node.id = String(i);
            name_node.innerHTML = data[i].name;
            cell_name.appendChild(name_node);
        
            // 2nd cell for catagory
            var cell_catagory = tr!.insertCell(1);
            let catagory_node = document.createElement("article");
            catagory_node.id = data[i].catagories;
            catagory_node.innerHTML = data[i].catagories;
            cell_catagory.appendChild(catagory_node);
        
            // 3rd cell for moreinfo button
            var node_moreinfo = tr!.insertCell(2);
            let moreinfo_node = document.createElement("button");
            moreinfo_node.id = "moreinfo" + String(data[i].ID!);
            moreinfo_node.className = "more-info";
            moreinfo_node.innerHTML = "More Info";
            node_moreinfo.appendChild(moreinfo_node);
            node_moreinfo.addEventListener("click", function(){     // clicking moreinfo
                pc.moreInfo(i);
            });
        
            // 4th cell for delete button
            var node_delete = tr!.insertCell(3);
            let delete_node = document.createElement("button");
            delete_node.id = "delete" + String(data[i].ID!);
            delete_node.className = "delete";
            delete_node.innerHTML = "Delete";
            node_delete.appendChild(delete_node);
            node_delete.addEventListener("click", function(){   // clicking delete
                pc.delete(i);
            });
            ID++;
        }
    } else {
        return;
    }
    return;
};

// dynamically adjust input for each catagory
function check(): void {

    let catagory = document.querySelector("#catagory-selector") as HTMLOptionElement;
    let catagory_val = catagory.value;

    if (catagory_val === Catagories.Grey){
        var dynamic_input = document.querySelector("#dynamic") as HTMLInputElement;
        dynamic_input!.placeholder = "Enter Swimming ability (out of 100)";
        dynamic_input!.setAttribute("type", "text");
    } else if (catagory_val === Catagories.Chestnut){
        var dynamic_input = document.querySelector("#dynamic") as HTMLInputElement;
        dynamic_input!.placeholder = "Enter Spoken Language";
        dynamic_input!.setAttribute("type", "text");   
    } else if (catagory_val === Catagories.Black){
        var dynamic_input = document.querySelector("#dynamic") as HTMLInputElement;
        dynamic_input!.placeholder = "Enter Strength ability (out of 10)";
        dynamic_input!.setAttribute("type", "text"); 
    } else if (catagory_val === Catagories.White) {
        var dynamic_input = document.querySelector("#dynamic") as HTMLInputElement;
        dynamic_input!.placeholder = "Enter Running ability (out of 100)";
        dynamic_input!.setAttribute("type", "text"); 
    } else {
        return;
    }
};

// adding pig info to localstorage
document.querySelector("#add")!.addEventListener('click', function(){

    // name
    const name = document.querySelector("#name") as HTMLInputElement | undefined;
    const name_val = name!.value;

    // height
    const height = document.querySelector("#height") as HTMLInputElement | undefined;
    const height_val = parseInt(height!.value);

    // weight
    const weight = document.querySelector("#weight") as HTMLInputElement | undefined;
    const weight_val = parseInt(weight!.value);

    // personality
    const personality = document.querySelector("#personality") as HTMLInputElement | undefined;
    const personality_val = personality!.value;

    // catagoty
    const catagory = document.querySelector("#catagory-selector") as HTMLOptionElement | undefined;
    const catagory_val = catagory!.value;
    if (catagory_val === Catagories.DidNotChoose) {
        alert("Error: did not choose catagory");
        return;
    } 

    // dynamic input
    const dynamic = document.querySelector("#dynamic") as HTMLInputElement | undefined;
    const dynamic_val = dynamic?.value;

    // breed
    const breed = document.querySelector("#breed") as HTMLInputElement | undefined;
    const breed_val = breed!.value;

    // --------------------error handlings-----------------------------------------
    
    // empty inputs
    if (height_val == null || weight_val == null || dynamic_val == "") {    
        alert("Error: detected empty height / weight / dynamic value");
        return;
    }
    // same name
    if (ID > 0) {
        for (let i = 0; i < ID; i++){
            var data = JSON.parse(localStorage.pigArray);
            if (name_val === data[i].name) {
                alert("Error: detected two identical names");
                return;
            }
        }
    }
    // -----------------------------------------------------------------------------


    // no errors, add pig & update next pig's ID
    var pig =  new Piggy(name_val, height_val, weight_val, personality_val, catagory_val, dynamic_val!, breed_val, ID);
    pc.add(pig);    
    ID++;

    // getting table
    var table = document.querySelector("#main-table") as HTMLTableElement | undefined;
    if (table == undefined) {
        alert("ERROR, main-table was not found");
        return;
    }
    
    // creating a new table row that contains the newly added pig
    var tr = table!.insertRow(-1);
    tr.id = "row" + String(pig.ID! + 2);

    // 1st cell for name
    var cell_name = tr!.insertCell(0);
    let name_node = document.createElement("article");
    name_node.id = String(pig.ID!);
    name_node.innerHTML = pig.name;
    cell_name.appendChild(name_node);

    // 2nd cell for catagory
    var cell_catagory = tr!.insertCell(1);
    let catagory_node = document.createElement("article");
    catagory_node.id = pig.catagories;
    catagory_node.innerHTML = pig.catagories;
    cell_catagory.appendChild(catagory_node);

    // 3rd cell for moreinfo button
    var node_moreinfo = tr!.insertCell(2);
    let moreinfo_node = document.createElement("button");
    moreinfo_node.id = "moreinfo" + String(pig.ID!);
    moreinfo_node.className = "more-info";
    moreinfo_node.innerHTML = "More Info";
    node_moreinfo.appendChild(moreinfo_node);
    node_moreinfo.addEventListener("click", function(){     // clicking moreinfo
        pc.moreInfo(pig.ID!);
    });

    // 4th cell for delete button
    var node_delete = tr!.insertCell(3);
    let delete_node = document.createElement("button");
    delete_node.id = "delete" + String(pig.ID!);
    delete_node.className = "delete";
    delete_node.innerHTML = "Delete";
    node_delete.appendChild(delete_node);
    node_delete.addEventListener("click", function(){   // clicking delete
        pc.delete(pig.ID!);
    });
});


