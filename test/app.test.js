
const request = require('supertest')('http://127.0.0.1:8081')
const expect = require('chai').expect

describe('Suite Test - API Rest Products', ()=>{

    describe('GET /api/products',()=>{
        describe('when get list products',()=>{
            describe('should respond with a 200 status code', ()=>{
                it('Must return 200',async()=>{
                    const response = await request.get('/api/productos')
                    expect(response.status).to.eql(200)
                })
            })
        
            describe('should respond with an array of products', ()=>{
                it('Must return 200',async()=>{
                    const response = await request.get('/api/productos')
                    expect(response.body).to.be.instanceOf(Array)
                })
            })
        })

        describe('when get a product',()=>{
            describe('should respond with a 200 status code', ()=>{
                it('Must return 200',async()=>{
                    const response = await request.get('/api/productos/1')
                    expect(response.status).to.eql(200)
                })
            })
    
            describe('should respond with an object of products', ()=>{
                it('Must return 200',async()=>{
                    const response = await request.get('/api/productos/1')
                    expect(response.body).to.be.instanceOf(Object)
                })
            })
        })

    })

    describe('POST /api/products',()=>{
        describe('should respond with a 401 status code when we are not authentication', ()=>{
            it('Must return 401',async()=>{
                const response = await request.post('/api/productos')
                expect(response.status).to.eql(401)
            })
        })

        describe('with authentication', ()=>{
            describe('when title is missing',()=>{
                describe('should respond with a 500 status code',()=>{
                    it('Must return 500',async()=>{
                        const product = {
                            title:'',
                            description:'prueba'
                        }
                        const response = await request.post('/api/productos').
                                                    set('admin','admin').
                                                    send(product)
                        expect(response.status).to.eql(500)
                    })
                })
            })

            describe('when title, description,photo is completed',()=>{
                describe('should respond with a 200 status code',()=>{
                    it('Must return 200',async()=>{
                        const product = {
                            title:'Notebook MSI Stealth',
                            description:'Notebook MSI Stealth',
                            thumbnail: 'https://m.media-amazon.com/images/I/71p3Ygm14wL._AC_SL1500_.jpg'
                        }
                        const response = await request.post('/api/productos').
                                                    set('admin','admin').
                                                    send(product)
                        expect(response.status).to.eql(200)
                    })
                })
            })
        })
    })

    describe('PUT /api/products',()=>{
        describe('should respond with a 404 status code when we are not authentication', ()=>{
            it('Must return 404',async()=>{
                const response = await request.put('/api/productos')
                expect(response.status).to.eql(404)
            })
        })

        describe('with authentication', ()=>{
            describe('when updated some product',()=>{
                describe('should respond with a 200 status code',()=>{
                    it('Must return 200',async()=>{
                        const product = {
                            title:'Notebook MSI Stealth updated',
                            description:'Notebook MSI Stealth',
                            thumbnail: 'https://m.media-amazon.com/images/I/71p3Ygm14wL._AC_SL1500_.jpg'
                        }
                        const response = await request.put('/api/productos/5').
                                                    set('admin','admin').
                                                    send(product)
                        expect(response.status).to.eql(200)
                    })
                })
            }) 
        })
    })

    describe('DELETE /api/products',()=>{
        describe('should respond with a 404 status code when we are not authentication', ()=>{
            it('Must return 404',async()=>{
                const response = await request.del('/api/productos')
                expect(response.status).to.eql(404)
            })
        })

        describe('with authentication', ()=>{
            describe('when deleted some product',()=>{
                describe('should respond with a 200 status code',()=>{
                    it('Must return 200',async()=>{

                        const response = await request.del('/api/productos/5').
                                                    set('admin','admin')
                        expect(response.status).to.eql(200)
                    })
                })
            }) 
        })
    })


})