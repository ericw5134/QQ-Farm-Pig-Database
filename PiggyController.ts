interface PiggyControllerInteraface {
    add(p:Piggy):void;
    getAll():Array<string>;
    delete(id:number):void;
    moreInfo(id:number):void;
}

class PiggyController implements PiggyControllerInteraface {
    piggy: Piggy[];

    constructor() {
        this.piggy = [];
    }

    add(p: Piggy): void {

        if(localStorage.pigArray){
            this.piggy = JSON.parse(localStorage.pigArray);
        }
        this.piggy.push(p);
        localStorage.pigArray = JSON.stringify(this.piggy);
    }

    getAll(): Array<string>{
        return JSON.parse(localStorage.pigArray);
    }

    moreInfo(id:number): void {

        var data = JSON.parse(localStorage.pigArray);

        // the section where i am storing the moreinfo table
        var section = document.querySelector("#more-info-table");

        // creating the moreinfo table
        var new_table = document.createElement("table");
        new_table.id = "info" 

        // row 0 is header row
        var header_row = new_table!.insertRow(0);
        var header = header_row!.insertCell(0);
        header.id = "moreinfo-header";
        header.innerHTML = "More Info: ";

        // row 1 is name row
        var name_row = new_table!.insertRow(1);
        var name = name_row.insertCell(0) as HTMLTableCellElement;
        name.innerHTML = "Name: ";
        var name_description = name_row.insertCell(-1) as HTMLTableCellElement;
        name_description.innerHTML = data[id - 1].name;

        // row 2 is breed row
        var breed_row = new_table!.insertRow(2);
        var breed = breed_row.insertCell(0);
        breed.innerHTML = "Breed: ";
        var breed_description = breed_row.insertCell(-1);
        breed_description.innerHTML = (data[id - 1].breed)!;

        // row 3 is height row
        var height_row = new_table!.insertRow(3);
        var height = height_row.insertCell(0);
        height.innerHTML = "Height: ";
        var height_description = height_row.insertCell(-1);
        height_description.innerHTML = data[id - 1].height + " honks";

        // row 4 is weight row
        var weight_row = new_table!.insertRow(4);
        var weight = weight_row.insertCell(0);
        weight.innerHTML = "Weight: ";
        var weight_description = weight_row.insertCell(-1);
        weight_description.innerHTML = data[id - 1].weight + " stones";

        // row 5 is the dynamic input row
        var dynamic_row = new_table!.insertRow(5);
        var dynamic = dynamic_row.insertCell(0);
        dynamic.innerHTML = "dynamic";
        var dynamic_description = dynamic_row.insertCell(-1);
        dynamic_description.innerHTML = data[id - 1].dynamic;

        // row 6 is personality row
        var personality_row = new_table!.insertRow(6);
        var personality = personality_row.insertCell(0);
        personality.innerHTML = "Personality: ";
        var personality_description = personality_row.insertCell(-1);
        personality_description.innerHTML = data[id - 1].personality;

        // add moreinfo table under <section id="more-info-table">
        section?.appendChild(new_table);
        
        return;
    }

    delete(id:number): void {

        alert(String(id) + " was passed into delete()");

        var data = JSON.parse(localStorage.pigArray);
        data.splice(id, 1);    // ex.  id = 1 is in array position 0
        // clear old array and upload new array
        localStorage.clear();     
        localStorage.setItem('pigArray', JSON.stringify(data));

        // getting the table and removing the approiate row
        var table = document.querySelector("#main-table") as HTMLTableElement;
        var x: number = table!.rows.length;
        alert("deleting row" + String(id+2));
        table?.deleteRow(id + 2);   // id = 0 --> in row 3

        // resetting ID for each pig
        for (let i = 0; i < data.length; i++) {
            alert("data["+String(i)+"].ID before change: " + String(data[i].ID));
            data[i].ID = i;
            alert("data["+String(i)+"].ID after change: " + String(data[i].ID));
        }

        // move row & all buttons' html id backwards by 1
        for (let i = id + 1; i < x;  i++){
            alert("checking tr" + String(i))
            // delete row
            var tr = document.querySelector("#row" + String(i));
            if (tr == null) {
                alert ("tr" + String(i) + " is null");
                return;
            }
            tr!.id = "row" + String(i-1);

            // delete button
            var delete_btn = document.querySelector("#delete" + String(i));
            if (delete_btn == null) {
                alert ("delete-btn is null");
                return;
            }
            delete_btn!.id = "delete" + String(i-1);

            // moreinfo button
            var moreinfo_btn = document.querySelector("#moreinfo" + String(i));
            if (moreinfo_btn == null) {
                alert ("moreinfo-btn is null");
                return;
            }
            moreinfo_btn!.id = "moreinfo" + String(i-1);
        }


        return;
    }
    
}