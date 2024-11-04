import giovanni from './assets/giovanni.png';
import james from './assets/james.jpg';
import jessie from './assets/jessie.jpg';
import meowth from './assets/meowth.jpg';
import './Home.css';
import NavigationBar from './NavigationBar';
function AboutUs() {
    return(
        <div>
            <NavigationBar/>
            <div className="About_Us" id="about" style={{marginTop: '180px'}}>
                    <div className="about-us">
                        <div className='about-us-text'>
                            <h1>About Us</h1>
                            <p><strong>&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Team Rocket!</strong> We are not just a group; we are a passionate and dedicated organization on a mission to become the ultimate Pokémon trainers and revolutionize the Pokémon world. Founded under the visionary leadership of Giovanni, we believe that the strongest Pokémon deserve to be harnessed and showcased, and we are here to fulfill that destiny.
                                <br />&nbsp;&nbsp;&nbsp;&nbsp;At Team Rocket, we embrace the thrill of the hunt, embarking on daring adventures to capture and train the most extraordinary Pokémon. Our members are united by a shared passion for Pokémon and a relentless pursuit of excellence. We take pride in our cunning strategies and innovative techniques, which allow us to capture rare and powerful Pokémon. Each capture tells a story of bravery, teamwork, and an unyielding spirit.</p>
                        </div>
                        <div className="team-section">
                            <h1>Our Team</h1>
                            <div className="team-members">
                                <div className="member Giovanni">
                                    <img src={giovanni} alt="Giovanni" />
                                    <h3>Giovanni</h3>
                                    <p><b>Chief Executive Officer of Team Rocket - Founder & Visonary</b></p>
                                    <p>The mastermind behind Team Rocket, Giovanni's vision is to dominate the Pokémon world. Ruthless, cunning, and powerful, he leads the organization with ironclad authority, ensuring that only the finest Pokémon make it into our collection—and onto this marketplace.</p>
                                </div>
                                <div className="member Jessie">
                                    <img src={jessie} alt="Jessie" />
                                    <h3>Jessie</h3>
                                    <p><b>Senior Pokémon Acquisition Specialist</b></p>
                                    <p>Jessie is relentless in her quest to capture rare and valuable Pokémon. With her quick thinking and unmatched determination, she ensures our inventory is stocked with the most sought-after species.</p>
                                </div>
                                <div className="member James">
                                    <img src={james} alt="James" />
                                    <h3>James</h3>
                                    <p><b>Lead Pokémon Handler</b></p>
                                    <p>James is known for his charm and creativity. His knack for handling the most difficult Pokémon makes him a vital part of Team Rocket's operations, ensuring smooth transactions for our customers.</p>
                                </div>
                                <div className="member Meowth">
                                    <img src={meowth} alt="Meowth" />
                                    <h3>Meowth</h3>
                                    <p><b>Head of Strategy & Negotiations</b></p>
                                    <p>Meowth’s sharp wit and silver tongue make him a master negotiator. Whether it’s setting prices or outwitting competitors, Meowth ensures that Team Rocket always gets the best deals—while keeping our customers happy.</p>
                                </div>
                            </div>
                        </div>
                        <div className="mission">
                            <h1>Our Mission</h1>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;Our mission is simple yet profound: to capture, train, and provide the finest Pokémon available for trainers around the world. We aim to create a community where every trainer, whether novice or experienced, can find the Pokémon that will propel them to new heights. We believe that every Pokémon has the potential to be great, and it is our responsibility to uncover and nurture that potential.
                                <br />&nbsp;&nbsp;&nbsp;&nbsp;Driven by our ambition and passion, we are committed to pushing the boundaries of what is possible in the Pokémon universe. We envision a future where our captured Pokémon are not just battle-ready but are also cherished companions, friends, and champions. Each Pokémon we capture is treated with respect and care, and we strive to create a harmonious bond between trainer and Pokémon.
                                <br />&nbsp;&nbsp;&nbsp;&nbsp;At Team Rocket, we welcome everyone who shares our vision. Whether you're a trainer searching for that elusive partner or simply a Pokémon enthusiast, we invite you to join us on this exhilarating journey. Together, we will explore the vast landscapes of the Pokémon world, uncovering treasures and forging unforgettable memories.
                                <br />&nbsp;&nbsp;&nbsp;&nbsp;Join us in our quest to redefine what it means to be a Pokémon trainer. The adventure begins now!</p>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default AboutUs;