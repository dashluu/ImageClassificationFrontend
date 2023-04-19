class ImagePrediction {
    static labels = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck'];

    constructor() {
        // Initiate the probability list for each class to 0
        this.probList = []
        for (let i = 0; i < ImagePrediction.labels.length; ++i) {
            this.probList.push(0.);
        }
    }

    getProbList() { return this.probList; }

    static create(probDict) {
        const imgPred = new ImagePrediction();
        let i = 0;

        for (var key in probDict) {
            console.log(key)
            imgPred.probList[i] = probDict[key];
            ++i;
        }

        return imgPred;
    }
}

export default ImagePrediction