class ImagePrediction {
    static labels = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck'];

    constructor() {
        this.probList = []
        for (let i = 0; i < ImagePrediction.labels.length; ++i) {
            this.probList.push(0.);
        }
    }

    getProbList() { return this.probList; }

    static create(data) {
        const imgPred = new ImagePrediction();
        let j = 0;

        for (var i in data) {
            imgPred.probList[j] = data[i];
            ++j;
        }

        return imgPred;
    }
}

export default ImagePrediction