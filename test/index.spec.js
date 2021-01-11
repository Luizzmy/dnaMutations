const hasMutation=require('../controllers/mutations')
const getStats=require('../controllers/stats')
const Mutation=require('../models/Mutation.model')

const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
chai.use(chaiHttp)
const app = require('../app')

const sinon = require("sinon")

describe("POST /mutation", () => {
  it("should return 403 status when connected to remote DB as dna is already in the DB", async () => {
    let res=await chai
    .request(app)
    .post('/mutation')
    .send({dna: ["ATGCGA","CAGTGA","TAGTTA","AGGAGA","GACTCA","TCACTG"]})
    expect(res.status).to.equal(403)
  });

  it("should return 201 status when connected to remote DB as dna i not in the DB", async () => {
    let res=await chai
    .request(app)
    .post('/mutation')
    .send({dna: ["AGGCGA","CAGTGA","TAGTTA","AGGAGA","GACTCG","TCACTG"]})
    expect(res.status).to.equal(200)
  });

  it("should return 403 status when less than 6 rows in the dna", async () => {
    let res=await chai
    .request(app)
    .post('/mutation')
    .send({dna: ["ATGCGA","CAGTGA","TAGTTA","AGGAGA","GACTCA"]})
    expect(res.status).to.equal(403)
  });

  it("should return 403 status when less than 6 letters in at least one of the rows", async () => {
    let res=await chai
    .request(app)
    .post('/mutation')
    .send({dna: ["ATGCGA","CAGTGA","TAGTTA","AGGAGA","GACTCA","TCACT"]})
    expect(res.status).to.equal(403)
  });

  it("should return 403 status when at least one of the letters is not A,G,T or C ", async () => {
    let res=await chai
    .request(app)
    .post('/mutation')
    .send({dna: ["ATGCGA","CAGTGA","TAGTTA","AGGYGA","GACTCA","TCACTG"]})
    expect(res.status).to.equal(403)
  });

  it("should classify as mutation when more than one sequence of the same 4 letters in rows", async () => {
    let res=await chai
    .request(app)
    .post('/mutation')
    .send({dna: ["ATAAAA","CAGGGG","TAGTTA","AGGTGA","GACTCA","TCACTG"]})
    expect(res.text).to.equal("true")
  });

  it("should classify as mutation when more than one sequence of the same 4 letters in columns", async () => {
    let res=await chai
    .request(app)
    .post('/mutation')
    .send({dna: ["ATGAAA","CAGGGA","TAGTTA","AGGTGA","GACTCA","TCACTG"]})
    expect(res.text).to.equal("true")
  });

  it("should classify as mutation when more than one sequence of the same 4 letters in diagonals both directions", async () => {
    let res=await chai
    .request(app)
    .post('/mutation')
    .send({dna: ["ATGAAA","GAGGGA","TGATTA","AGGAGT","GACGGA","TCACTG"]})
    expect(res.text).to.equal("true")
  });

  it("should classify as mutation with any combination of rows, columns or diagonals", async () => {
    let res=await chai
    .request(app)
    .post('/mutation')
    .send({dna: ["ATGAAA","GAGGGA","TGATTA","AGGAGA","GACGTA","TCACTG"]})
    expect(res.text).to.equal("true")
  });

  it("should not classify as mutation if there are no sequences of 4 same letters, columns or diagonals", async () => {
    let res=await chai
    .request(app)
    .post('/mutation')
    .send({dna: ["ATGCGA","CAGGCG","TATTTC","AGGAGA","GCGTCA","TCACTG"]})
    expect(res.text).to.equal("false")
  });
  

  afterEach(async () => {
    await Mutation.deleteOne({dna: ["AGGCGA","CAGTGA","TAGTTA","AGGAGA","GACTCG","TCACTG"]})
    await Mutation.deleteOne({dna: ["ATAAAA","CAGGGG","TAGTTA","AGGTGA","GACTCA","TCACTG"]})
    await Mutation.deleteOne({dna: ["ATGAAA","GAGGGA","TGATTA","AGGAGT","GACGGA","TCACTG"]})
    await Mutation.deleteOne({dna: ["ATGAAA","CAGGGA","TAGTTA","AGGTGA","GACTCA","TCACTG"]})
    await Mutation.deleteOne({dna: ["ATGAAA","GAGGGA","TGATTA","AGGAGA","GACGTA","TCACTG"]})
    await Mutation.deleteOne({dna: ["ATGCGA","CAGGCG","TATTTC","AGGAGA","GCGTCA","TCACTG"]})


})
});
