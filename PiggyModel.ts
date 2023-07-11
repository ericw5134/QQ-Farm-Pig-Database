class Piggy {

    constructor(
        public name: string, 
        public height: number, 
        public weight: number, 
        public personality: string,
        public catagories: string,
        public dynamic: string | number,
        public breed: string,
        public ID: number) {}
}

enum Catagories {
    Grey = "grey",
    Chestnut = "chestnut",
    White = "white",
    Black = "black",
    DidNotChoose = "didnotchoose"
}