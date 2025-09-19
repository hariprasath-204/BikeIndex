// ----------------------
// Load Dependencies
// ----------------------
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer"); // <- Add this line
require("dotenv").config();
const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure uploads folder exists
if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");

// ----------------------
// MySQL Database Connection
// ----------------------
const db = mysql.createConnection({
  host: "localhost",
  user: "nodeuser", // change to your MySQL username
  password: "test123", // change to your MySQL password
  database: "rkbikes"
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database ✅");
});
// ----------------------
// Serve Static Files
// ----------------------
app.use(express.static(__dirname));

// Root Route → Send index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});
app.get("/product", (req, res) => {
  res.sendFile(path.join(__dirname, "product.html"));
});
app.get("/service", (req, res) => {
  res.sendFile(path.join(__dirname, "service.html"));
});
app.get("/testdrive", (req, res) => {
  res.sendFile(path.join(__dirname, "testdrive.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});
app.get("/booking", (req, res) => {
  res.sendFile(path.join(__dirname, "booking.html"));
});
app.get("/help", (req, res) => {
  res.sendFile(path.join(__dirname, "help.html"));
});


// ----------------------
// JWT Secret
// ----------------------
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// ----------------------
// Register
// ----------------------
app.post("/api/register", async (req, res) => {
  try {
    const { first_name, last_name, email, phone, password, gender } = req.body;

    if (!first_name || !last_name || !email || !phone || !password || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (first_name, last_name, email, phone, password, gender) VALUES (?, ?, ?, ?, ?, ?)",
        [first_name, last_name, email, phone, hashedPassword, gender],
        (err) => {
          if (err) throw err;
          res.json({ message: "Registration successful" });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ----------------------
// Login
// ----------------------
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  });
});

// ----------------------
// Middleware: Authenticate Token
// ----------------------
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
// ----------------------
// Get Logged-in User's Bookings
// ----------------------
app.get("/api/my-bookings", authenticateToken, (req, res) => {
  // Get the logged-in user's email
  db.query("SELECT email FROM users WHERE id = ?", [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch user" });
    if (results.length === 0) return res.status(404).json({ error: "User not found" });

    const userEmail = results[0].email;

    db.query(
      `SELECT booking_id, full_name, mobile, email, bike_model, preferred_date, preferred_time, experience, created_at,status
       FROM testdrive_bookings
       WHERE email = ?
       ORDER BY created_at DESC`,
      [userEmail],
      (err2, bookings) => {
        if (err2) return res.status(500).json({ error: "Failed to fetch bookings" });
        res.json(bookings);
      }
    );
  });
});

// ----------------------
// Test Drive Booking APIs
// ----------------------

const nodemailer = require("nodemailer");



// Nodemailer config
const transporter = nodemailer.createTransport({
  service: "gmail", // or your email provider
  auth: {
    user: "bikeshowroom162@gmail.com",
    pass: "diwa zezm dues wcdu", // or app password
  },
});
app.post("/api/testdrive", async (req, res) => {
  const {
    full_name,
    mobile,
    email,
    bike_model,
    preferred_date,
    preferred_time,
    driving_license,
    experience,
    agreed_terms
  } = req.body;

  // Validate required fields
  if (!full_name || !mobile || !email || !bike_model || !preferred_date || !preferred_time || !driving_license || !experience) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Insert booking into database
  const query = `
    INSERT INTO testdrive_bookings 
    (full_name, mobile, email, bike_model, preferred_date, preferred_time, driving_license, experience, agreed_terms)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [full_name, mobile, email, bike_model, preferred_date, preferred_time, driving_license, experience, agreed_terms ? 1 : 0],
    async (err, result) => {
      if (err) {
        console.error("Error inserting booking:", err);
        return res.status(500).json({ error: "Failed to save booking" });
      }

      const bookingId = result.insertId;
      

      const duration = "15-30 minutes";
      const instructions = "Please carry a valid driving license and arrive 10 minutes before your scheduled time.";
      const showroom = "R.K. Bajaj Showroom, 194, Thiruthangal Road, Cornation Busstop, Sivakasi, Tamil Nadu 626123";

      // Email to user
      const mailOptionsUser = {
        from: "bikeshowroom162@gmail.com",
        to: email,
        subject: "Test Drive Booking Confirmation",
        text: `Hi ${full_name},

Your test drive booking is confirmed!

Booking Details:
- Booking ID: ${bookingId}
- Bike Model: ${bike_model}
- Preferred Date: ${preferred_date}
- Preferred Time: ${preferred_time}
- Riding Experience: ${experience}
- Estimated Duration: ${duration}
- Showroom: ${showroom}

Special Instructions:
${instructions}
Check the Status in your profile 
Thank you for choosing us!
`
      };

      // Email to showroom/admin
      const mailOptionsAdmin = {
        from: "bikeshowroom162@gmail.com",
        to: "bikeshowroom162@gmail.com", // showroom/admin email
        subject: `New Test Drive Booking - ${full_name}`,
        text: `New test drive booking received:

Booking ID: ${bookingId}
Full Name: ${full_name}
Mobile: ${mobile}
Email: ${email}
Bike Model: ${bike_model}
Preferred Date: ${preferred_date}
Preferred Time: ${preferred_time}
Experience: ${experience}
`
      };

      let smsSent = false;

      try {
        // Send emails
        await transporter.sendMail(mailOptionsUser);
        console.log("Email sent to user ✅");

        await transporter.sendMail(mailOptionsAdmin);
        console.log("Email sent to showroom/admin ✅");

        

        res.json({ 
          message: `Test drive booked successfully ✅${smsSent ? " Email & SMS sent" : " Emails sent, SMS not sent"}`, 
          bookingId 
        });

      } catch (notificationError) {
        console.error("Notification error:", notificationError);
        res.json({ message: "Booking saved, but failed to send email/SMS", bookingId });
      }
    }
  );
});










// ----------------------
// Get Profile
// ----------------------
app.get("/api/profile", authenticateToken, (req, res) => {
  db.query(
    "SELECT first_name, last_name, email, phone, gender FROM users WHERE id = ?",
    [req.user.id],
    (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    }
  );
});


// ----------------------
// Update Bookings when Profile is Updated
// ----------------------
app.put("/api/profile", authenticateToken, (req, res) => {
  const { first_name, last_name, phone } = req.body;

  // Update user profile
  db.query(
    "UPDATE users SET first_name = ?, last_name = ?, phone = ? WHERE id = ?",
    [first_name, last_name, phone, req.user.id],
    (err) => {
      if (err) {
        console.error("Error updating profile:", err);
        return res.status(500).json({ error: "Failed to update profile" });
      }

      // ✅ Update bookings with the new name & phone
      db.query(
        "UPDATE testdrive_bookings SET full_name = ?, mobile = ? WHERE email = (SELECT email FROM users WHERE id = ?)",
        [`${first_name} ${last_name}`, phone, req.user.id],
        (err2) => {
          if (err2) {
            console.error("Error updating bookings:", err2);
            return res.status(500).json({ error: "Profile updated but bookings not synced" });
          }
          res.json({ message: "Profile & bookings updated successfully ✅" });
        }
      );
    }
  );
});


// ----------------------
// Change Password
// ----------------------
app.put("/api/change-password", authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  db.query("SELECT password FROM users WHERE id = ?", [req.user.id], async (err, results) => {
    if (err) throw err;
    const isMatch = await bcrypt.compare(currentPassword, results[0].password);
    if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    db.query("UPDATE users SET password = ? WHERE id = ?", [hashedNewPassword, req.user.id], (err) => {
      if (err) throw err;
      res.json({ message: "Password updated" });
    });
  });
});

// ----------------------
// Delete Account
// ----------------------
app.delete("/api/delete-account", authenticateToken, (req, res) => {
  db.query("DELETE FROM users WHERE id = ?", [req.user.id], (err) => {
    if (err) throw err;
    res.json({ message: "Account deleted" });
  });
});
// ----------------------
// Get All Users (Admin)
// ----------------------
app.get("/api/admin/users", authenticateToken, (req, res) => {
  // Optional: only allow certain admin accounts
  db.query("SELECT first_name, last_name, email, phone FROM users", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});




// Fetch All Bikes
app.get("/api/bikes", (req, res) => {
  const query = `
    SELECT b.id, b.name, b.price, b.engine, b.mileage, b.thumbnail, c.code AS category
    FROM bikes b
    JOIN categories c ON b.category_id = c.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to load bikes" });

    // prepend images/ to thumbnails
    const bikes = results.map(b => ({
      ...b,
      thumbnail: "images/" + b.thumbnail
    }));

    res.json(bikes);
  });
});

// Fetch Single Bike
app.get("/api/bikes/:id", (req, res) => {
  const bikeId = req.params.id;
  db.query("SELECT * FROM bikes WHERE id = ?", [bikeId], (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    if (results.length === 0) return res.status(404).json({ error: "Bike not found" });

    const bike = results[0];
    bike.thumbnail = "images/" + bike.thumbnail;

    db.query("SELECT image_url FROM bike_images WHERE bike_id = ?", [bikeId], (err, images) => {
      if (err) return res.status(500).json({ error: "DB error" });

      bike.images = images.map(i => "images/" + i.image_url);

      db.query("SELECT feature FROM bike_features WHERE bike_id = ?", [bikeId], (err, features) => {
        if (err) return res.status(500).json({ error: "DB error" });
        bike.features = features.map(f => f.feature);
        res.json(bike);
      });
    });
  });
});


// Get logged-in user's service bookings
app.get("/api/my-services", authenticateToken, (req, res) => {
  const userId = req.user.id; // from JWT token

  // Get user's email
  const userQuery = "SELECT email FROM users WHERE id = ?";
  db.query(userQuery, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch user" });
    if (results.length === 0) return res.status(404).json({ error: "User not found" });

    const userEmail = results[0].email;

    const serviceQuery = `
      SELECT booking_id, full_name, mobile, email, bike_model, service_type, preferred_date, notes, status, created_at
      FROM service_bookings
      WHERE email = ?
      ORDER BY created_at DESC
    `;

    db.query(serviceQuery, [userEmail], (err2, bookings) => {
      if (err2) return res.status(500).json({ error: "Failed to fetch service bookings" });

      res.json(bookings);
    });
  });
});
// ---------------- Book a Service ----------------
app.post('/api/book-service', authenticateToken, (req, res) => {
  const { fullName, mobile, email, bikeModel, serviceType, serviceDate, notes } = req.body;
  const userId = req.user.id; // from JWT

  // Validate required fields
  if (!fullName || !mobile || !bikeModel || !serviceType || !serviceDate) {
    return res.status(400).json({ message: 'Please fill all required fields.' });
  }

  // Insert into database
  const query = `
    INSERT INTO service_bookings
    (user_id, full_name, mobile, email, bike_model, service_type, preferred_date, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [userId, fullName, mobile, email || null, bikeModel, serviceType, serviceDate, notes || null],
    (err, result) => {
      if (err) {
        console.error('MySQL Error:', err);
        return res.status(500).json({ message: 'Database error', error: err.sqlMessage });
      }

      const bookingId = result.insertId;

      // Send confirmation email if email is provided
      if (email) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "bikeshowroom162@gmail.com",
            pass: "diwa zezm dues wcdu", // Use app password
          },
        });

        const mailOptions = {
          from: '"Bike Showroom" <bikeshowroom162@gmail.com>',
          to: email,
          subject: 'Service Booking Confirmation',
          html: `
            <h3>Service Booking Confirmed!</h3>
            <p>Dear ${fullName},</p>
            <p>Your service booking has been confirmed with the following details:</p>
            <ul>
              <li><b>Booking ID:</b> ${bookingId}</li>
              <li><b>Bike Model:</b> ${bikeModel}</li>
              <li><b>Service Type:</b> ${serviceType}</li>
              <li><b>Preferred Date:</b> ${new Date(serviceDate).toLocaleDateString()}</li>
              ${notes ? `<li><b>Notes:</b> ${notes}</li>` : ''}
            </ul>
            Check the Status in your profile
            <p>Thank you for choosing our service!</p>
          `
        };

        transporter.sendMail(mailOptions, (emailErr, info) => {
          if (emailErr) {
            console.error('Email Error:', emailErr);
            return res.status(500).json({ message: 'Booking saved, but failed to send email', bookingId });
          }

          console.log('Email sent:', info.response);
          res.json({ message: 'Service booked successfully and email sent!', bookingId });
        });
      } else {
        // No email provided
        res.json({ message: 'Service booked successfully!', bookingId });
      }
    }
  );
});

// --- API: Get Bike Bookings ---
app.get('/api/my-bikebookings', authenticateToken, (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT booking_id, bike_id, bike_name, status, created_at
    FROM bookings
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(query, [userId], (err, bookings) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to fetch bike bookings" });
    }
    res.json(bookings);
  });
});



app.post('/api/bikebooking', authenticateToken, (req, res) => {
    const userId = req.user?.id || null;

    const {
        bikeId,
        bikeName,
        fullName, fatherName, dateOfBirth, mobile, alternatePhone, email, occupation,
        currentAddress, city, state, pincode,
        permanentAddress, permanentCity, permanentState, permanentPincode,
        aadharNumber, panNumber, drivingLicense, voterIdNumber, passportNumber
    } = req.body;

    if (!bikeId || !bikeName) {
        return res.status(400).json({ message: "Bike ID and Bike Name are required!" });
    }

    db.query(
        `INSERT INTO bookings 
        (user_id, bike_id, bike_name, full_name, father_name, date_of_birth, mobile, alternate_phone, email, occupation,
         current_address, city, state, pincode,
         permanent_address, permanent_city, permanent_state, permanent_pincode,
         aadhar_number, pan_number, driving_license, voter_id_number, passport_number)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            userId, bikeId, bikeName, fullName, fatherName, dateOfBirth, mobile, alternatePhone || null, email, occupation,
            currentAddress, city, state, Number(pincode),
            permanentAddress, permanentCity, permanentState, Number(permanentPincode),
            aadharNumber,
            panNumber.toUpperCase(),
            drivingLicense.toUpperCase(),
            voterIdNumber || null,
            passportNumber || null
        ],
        async (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database error', error: err.sqlMessage });
            }

            const bookingId = result.insertId;

            // Fetch booking date (created_at)
            db.query(`SELECT created_at FROM bookings WHERE booking_id = ?`, [bookingId], (err2, rows) => {
                if (err2) {
                    console.error(err2);
                    return res.status(500).json({ message: 'Database error while fetching booking date' });
                }

                const bookingDate = rows[0].created_at;

                // --- Generate PDF ---
                const pdfPath = path.join(__dirname, `booking_${bookingId}.pdf`);
                const doc = new PDFDocument({ margin: 50 });
                doc.pipe(fs.createWriteStream(pdfPath));

                // Heading
                doc.fontSize(26).text("R.K Bajaj Bike Booking Information", { align: "center" });
                doc.moveDown(1);
                

               // Table setup
const tableTop = 180;
const colX = [50, 250, 550]; // column boundaries
let y = tableTop;

// --- Draw the very first top line ---
doc.lineWidth(1);
doc.moveTo(colX[0], y).lineTo(colX[2], y).stroke();

// Table row function
function drawRow(label, value) {
    const labelOptions = { width: colX[1] - colX[0] - 10 };
    const valueOptions = { width: colX[2] - colX[1] - 10 };

    const startY = y;

    // Draw row text
    doc.font("Helvetica-Bold").fontSize(12).text(label, colX[0] + 5, y + 8, labelOptions);
    doc.font("Helvetica").fontSize(12).text(value, colX[1] + 5, y + 8, valueOptions);

    // Calculate row height dynamically based on text
    const labelHeight = doc.heightOfString(label, labelOptions);
    const valueHeight = doc.heightOfString(value, valueOptions);
    const rowHeightDynamic = Math.max(labelHeight, valueHeight) + 16; // + padding

    // Draw row borders
    doc.moveTo(colX[0], startY).lineTo(colX[0], startY + rowHeightDynamic).stroke(); // left
    doc.moveTo(colX[1], startY).lineTo(colX[1], startY + rowHeightDynamic).stroke(); // middle
    doc.moveTo(colX[2], startY).lineTo(colX[2], startY + rowHeightDynamic).stroke(); // right
    doc.moveTo(colX[0], startY + rowHeightDynamic).lineTo(colX[2], startY + rowHeightDynamic).stroke(); // bottom

    // Move cursor down
    y += rowHeightDynamic;
}



                // Rows
                drawRow("Booking ID", bookingId);
                drawRow("Booking Date", bookingDate.toISOString().slice(0, 19).replace("T", " "));
                drawRow("Bike", `${bikeName}`);
                drawRow("Full Name", fullName);
                drawRow("Father's Name", fatherName);
                drawRow("Date of Birth", dateOfBirth);
                drawRow("Mobile", mobile);
                drawRow("Email", email);
                drawRow("Occupation", occupation);
                drawRow("Current Address", `${currentAddress}, ${city}, ${state} - ${pincode}`);
                drawRow("Permanent Address", `${permanentAddress}, ${permanentCity}, ${permanentState} - ${permanentPincode}`);
                drawRow("Aadhar Number", aadharNumber);
                drawRow("PAN Number", panNumber.toUpperCase());
                drawRow("Driving License", drivingLicense.toUpperCase());
                if (voterIdNumber) drawRow("Voter ID", voterIdNumber);
                if (passportNumber) drawRow("Passport Number", passportNumber);

                // Note section
                y += 40;
                doc.font("Helvetica-Bold").fontSize(12).text("Note:", 50, y);
                doc.font("Helvetica").fontSize(12).text("Check the booking status in your profile.", 100, y);

                // End document
                doc.end();

                // --- Send Email ---
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "bikeshowroom162@gmail.com",
                        pass: "diwa zezm dues wcdu", // use app password
                    },
                });

                const mailOptions = {
                    from: '"Bike Showroom" <bikeshowroom162@gmail.com>',
                    to: email,
                    subject: "Your Bike Booking Confirmation",
                    text: `Dear ${fullName},\n\nYour bike booking Details!\n\nBooking ID: ${bookingId}\nBooking Date: ${bookingDate.toISOString().slice(0, 19).replace("T", " ")}\nBike: ${bikeName}\n\nPlease find attached your booking confirmation PDF.\n\nThanks,\nBike Showroom`,
                    attachments: [
                        { filename: `booking_${bookingId}.pdf`, path: pdfPath }
                    ]
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    // Delete PDF after sending
                    fs.unlinkSync(pdfPath);

                    if (error) {
                        console.error("Email error:", error);
                        return res.status(500).json({ message: "Booking saved, but email failed", bookingId });
                    }
                    res.json({ message: 'Bike booking saved and email sent successfully!', bookingId });
                });
            });
        }
    );
});


// Contact API route
app.post('/api/contact', async (req, res) => {
    try {
        const { name, phone, email, subject, message } = req.body;

        if (!name || !phone || !email || !message) {
            return res.status(400).json({ error: 'Please fill all required fields.' });
        }

        // Insert into DB
        const sql = `INSERT INTO contact_messages (name, phone, email, subject, message) VALUES (?, ?, ?, ?, ?)`;
        await new Promise((resolve, reject) => {
            db.query(sql, [name, phone, email, subject, message], (err, result) => {
                if (err) return reject(err);
                console.log('DB insertion successful, ID:', result.insertId);
                resolve(result);
            });
        });

        // User email
        const userMailOptions = {
            from: 'bikeshowroom162@gmail.com',
            to: email,
            subject: `Thank you for contacting us, ${name}`,
            html: `<p>Hi ${name},</p>
                   <p>Thank you for reaching out regarding <strong>${subject}</strong>.</p>
                   <p>Your message: ${message}</p>
                   <p>Best Regards,<br>Your request was sumbit and admin will contact will soon... <br>R.K. Bajaj Showroom</p>`
        };

        // Showroom email
        const showroomMailOptions = {
            from: 'bikeshowroom162@gmail.com',
            to: 'bikeshowroom162@gmail.com',
            subject: `New Contact Form Submission from ${name}`,
            html: `<p>New message received:</p>
                   <p>Name: ${name}</p>
                   <p>Phone: ${phone}</p>
                   <p>Email: ${email}</p>
                   <p>Subject: ${subject}</p>
                   <p>Message: ${message}</p>`
        };

        // Send emails
        try {
            const infoUser = await transporter.sendMail(userMailOptions);
            console.log('User email sent:', infoUser.response);
        } catch (err) {
            console.error('User email failed:', err);
        }

        try {
            const infoShowroom = await transporter.sendMail(showroomMailOptions);
            console.log('Showroom email sent:', infoShowroom.response);
        } catch (err) {
            console.error('Showroom email failed:', err);
        }

        res.json({ success: true, message: 'Message submitted. Check server logs for email status.' });

    } catch (err) {
        console.error('Full error:', err);
        res.status(500).json({ error: err.message || 'Server error. Please try again later.' });
    }
});

app.listen(3000, '0.0.0.0', () => {
  console.log("Server running at http://<your-local-ip>:3000");
});

// ----------------------
// Start Server
// ----------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
