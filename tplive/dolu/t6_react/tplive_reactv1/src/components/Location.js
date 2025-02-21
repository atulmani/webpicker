import React from 'react'

export default function Location() {
    return (
        <>
            <section id="city_new">
                <div className="container"><br />

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="heading">
                            <span className="material-symbols-outlined">
                                location_city
                            </span>
                            <h4 style={{ fontWeight: '1000' }}>Cities</h4>
                        </div>
                    </div><br />

                    <div className="row no-gutters large">

                        <div className="col-lg-2 col-md-3 col-sm-6" onClick={locationSelect('All')} style={{ padding: '10px' }}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/jaipuricon.png" alt="" />
                                </div>
                                <h2>All</h2>
                                <h3><span id="allCnt1">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6" onClick={locationSelect('Pune')} style={{ padding: '10px' }}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/puneicon.png" alt="" />
                                </div>
                                <h2>Pune</h2>
                                <h3><span id="puneCnt1">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6" onClick={locationSelect('Bangalore')} style={{ padding: '10px' }}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/bangloreicon.png" alt="" />
                                </div>
                                <h2>Banglore</h2>
                                <h3><span id="bangaloreCnt1">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6" onClick={locationSelect('Mysore')} style={{ padding: '10px' }}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img style={{ padding: '6px' }} src="./img/mysoreicon.png" alt="" />
                                </div>
                                <h2>Mysore</h2>
                                <h3><span id="mysoreCnt1">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6" onClick={locationSelect('Chennai')} style={{ padding: '10px' }}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/chennaiicon.png" alt="" />
                                </div>
                                <h2>Chennai</h2>
                                <h3><span id="chennaiCnt1">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6" onClick={locationSelect('Mumbai')} style={{ padding: '10px' }}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/mumbaiicon.png" alt="" />
                                </div>
                                <h2>Mumbai</h2>
                                <h3><span id="mumbaiCnt1">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6" onClick={locationSelect('Buldhana')} style={{ padding: '10px' }}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/hyderabadicon.png" alt="" />
                                </div>
                                <h2>Buldhana</h2>
                                <h3><span id="buldhanaCnt1">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6" onClick={locationSelect('Hyderabad')}
                            style={{ padding: '10px', display: 'none' }}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/hyderabadicon.png" alt="" />
                                </div>
                                <h2>Hyderabad</h2>
                                <h3><span id="hyderabadCnt1">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6" onClick={locationSelect('Delhi')} style={{ padding: '10px' }}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/delhiicon.png" alt="" />
                                </div>
                                <h2>Delhi</h2>
                                <h3><span id="delhiCnt1">0</span> Events</h3>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-3 col-sm-6" onClick={locationSelect('Lucknow')} style={{ padding: '10px' }}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/lucknowicon.png" alt="" />
                                </div>
                                <h2>Lucknow</h2>
                                <h3><span id="lucknowCnt1">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6" onClick={locationSelect('Jaipur')}
                            style={{ padding: '10px', display: 'none' }}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/jaipuricon.png" alt="" />
                                </div>
                                <h2>Jaipur</h2>
                                <h3><span id="jaipurCnt1">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6" onClick={locationSelect('Ahemdabad')} style={{ padding: '10px' }}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/ahemdabadicon.png" alt="" />
                                </div>
                                <h2>Ahemdabad</h2>
                                <h3><span id="ahemdabadCnt1">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6" onClick={locationSelect('Chandigarh')} style={{ padding: '10px' }}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/chandigarhicon.png" alt="" />
                                </div>
                                <h2>Chandigarh</h2>
                                <h3><span id="chandigarhCnt1">0</span> Events</h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6" onClick={locationSelect('Kolkata')} style={{ padding: '10px' }}>
                            <div className="genre-locoation-card">
                                <div className="">
                                    <img src="./img/kolkataicon.png" alt="" />
                                </div>
                                <h2>Kolkata</h2>
                                <h3><span id="kolkataCnt1">0</span> Events</h3>
                            </div>
                        </div>

                    </div>


                    <div className="small">
                        <div className="row no-gutters">

                            <div className="col-4" style={{ padding: '10px' }} onClick={locationSelect('All')}>
                                <div className="genre-locoation-card">
                                    <div className="">
                                        <img src="./img/jaipuricon.png" alt="" />
                                    </div>
                                    <h2>All</h2>
                                    <h3><span id="allCnt">0</span> Events</h3>
                                </div>
                            </div>

                            <div className="col-4" style={{ padding: '10px' }} onClick={locationSelect('Pune')}>
                                <div className="genre-locoation-card">
                                    <div className="">
                                        <img src="./img/puneicon.png" alt="" />
                                    </div>
                                    <h2>Pune</h2>
                                    <h3><span id="puneCnt">0</span> Events</h3>
                                </div>
                            </div>
                            <div className="col-4" style={{ padding: '10px' }} onClick={locationSelect('Bangalore')}>

                                <div className="genre-locoation-card">
                                    <div className="">
                                        <img src="./img/bangloreicon.png" alt="" />
                                    </div>
                                    <h2>Banglore</h2>
                                    <h3><span id="bangaloreCnt">0</span> Events</h3>
                                </div>
                            </div>
                            <div className="col-4" style={{ padding: '10px' }} onClick={locationSelect('Mysore')}>

                                <div className="genre-locoation-card">
                                    <div className="">
                                        <img style={{ padding: '6px' }} src="./img/mysoreicon.png" alt="" />
                                    </div>
                                    <h2>Mysore</h2>
                                    <h3><span id="mysoreCnt">0</span> Events</h3>
                                </div>
                            </div>
                            <div className="col-4" style={{ padding: '10px' }} onClick={locationSelect('Chennai')}>
                                <div className="genre-locoation-card">
                                    <div className="">
                                        <img src="./img/chennaiicon.png" alt="" />
                                    </div>
                                    <h2>Chennai</h2>
                                    <h3><span id="chennaiCnt">0</span> Events</h3>
                                </div>
                            </div>
                            <div className="col-4" style={{ padding: '10px' }} onClick={locationSelect('Mumbai')}>
                                <div className="genre-locoation-card">
                                    <div className="">
                                        <img src="./img/mumbaiicon.png" alt="" />
                                    </div>
                                    <h2>Mumbai</h2>
                                    <h3><span id="mumbaiCnt">0</span> Events</h3>
                                </div>
                            </div>
                            <div className="col-4" style={{ padding: '10px' }} onClick={locationSelect('Buldhana')}>
                                <div className="genre-locoation-card">
                                    <div className="">
                                        <img src="./img/hyderabadicon.png" alt="" />
                                    </div>
                                    <h2>Buldhana</h2>
                                    <h3><span id="buldhanaCnt">0</span> Events</h3>
                                </div>
                            </div>
                            <div className="col-4" style={{ padding: '10px', display: 'none' }} onClick={locationSelect('Hyderabad')}>
                                <div className="genre-locoation-card">
                                    <div className="">
                                        <img src="./img/hyderabadicon.png" alt="" />
                                    </div>
                                    <h2>Hyderabad</h2>
                                    <h3><span id="hyderabadCnt">0</span> Events</h3>
                                </div>
                            </div>
                            <div className="col-4" style={{ padding: '10px' }} onClick={locationSelect('Delhi')}>
                                <div className="genre-locoation-card">
                                    <div className="">
                                        <img src="./img/delhiicon.png" alt="" />
                                    </div>
                                    <h2>Delhi</h2>
                                    <h3><span id="delhiCnt">0</span> Events</h3>
                                </div>
                            </div>

                            <div className="col-4" style={{ padding: '10px' }} onClick={locationSelect('Lucknow')}>
                                <div className="genre-locoation-card">
                                    <div className="">
                                        <img src="./img/lucknowicon.png" alt="" />
                                    </div>
                                    <h2>Lucknow</h2>
                                    <h3><span id="lucknowCnt">0</span> Events</h3>
                                </div>
                            </div>
                            <div className="col-4" style={{ padding: '10px', display: 'none' }} onClick={locationSelect('Jaipur')}>
                                <div className="genre-locoation-card">
                                    <div className="">
                                        <img src="./img/jaipuricon.png" alt="" />
                                    </div>
                                    <h2>Jaipur</h2>
                                    <h3><span id="jaipurCnt">0</span> Events</h3>
                                </div>
                            </div>
                            <div className="col-4" style={{ padding: '10px' }} onClick={locationSelect('Ahemdabad')}>
                                <div className="genre-locoation-card">
                                    <div className="">
                                        <img src="./img/ahemdabadicon.png" alt="" />
                                    </div>
                                    <h2>Ahemdabad</h2>
                                    <h3><span id="ahemdabadCnt">0</span> Events</h3>
                                </div>
                            </div>
                            <div className="col-4" style={{ padding: '10px' }} onClick={locationSelect('Chandigarh')}>
                                <div className="genre-locoation-card">
                                    <div className="">
                                        <img src="./img/chandigarhicon.png" alt="" />
                                    </div>
                                    <h2>Chandigarh</h2>
                                    <h3><span id="chandigarhCnt">0</span> Events</h3>
                                </div>
                            </div>
                            <div className="col-4" style={{ padding: '10px' }} onClick={locationSelect('Kolkata')}>
                                <div className="genre-locoation-card">
                                    <div className="">
                                        <img src="./img/kolkataicon.png" alt="" />
                                    </div>
                                    <h2>Kolkata</h2>
                                    <h3><span id="kolkataCnt">0</span> Events</h3>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <br className="large" /> <br />
        </>
    )
}

function locationSelect(city) {
    console.log(city)
}