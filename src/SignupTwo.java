import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SignupTwo extends JFrame implements ActionListener {
    JTextField pan, aadhar;
    JButton next;
    JRadioButton syes, sno, eyes, eno;
    JComboBox religion, category, income, education, occupation;
    String formno;
    SignupTwo(String formno){
        this.formno = formno;
        setLayout(null);

        setTitle("NEW ACCOUNT APPLICATION FORM - PAGE TWO");

        JLabel additionalDetails = new JLabel("Page 2: Additional Details");
        additionalDetails.setFont(new Font("Raleway", Font.BOLD, 22));
        additionalDetails.setBounds(290,80,400,30);
        add(additionalDetails);

        JLabel name = new JLabel("Religion:");
        name.setFont(new Font("Raleway", Font.BOLD, 20));
        name.setBounds(100,140,100,30);
        add(name);

        String religionValues[] = {"Hindu","Muslim","Sikh","Christian","Other"};
        religion = new JComboBox<>(religionValues);
        religion.setBounds(300,140,400,30);
        religion.setBackground(Color.white);
        add(religion);

        JLabel fname = new JLabel("Category:");
        fname.setFont(new Font("Raleway", Font.BOLD, 20));
        fname.setBounds(100,190,200,30);
        add(fname);

        String categoryValues[] = {"General","OBC","SC","ST","Other"};
        category = new JComboBox(categoryValues);
        category.setBounds(300,190,400,30);
        category.setBackground(Color.white);
        add(category);

        JLabel dob = new JLabel("Income:");
        dob.setFont(new Font("Raleway", Font.BOLD, 20));
        dob.setBounds(100,240,200,30);
        add(dob);

        String incomeValues[] = {"Null","<150,000","<250,000","<500,000","Upto 1,000,000","Above 1,000,000"};
        income = new JComboBox(incomeValues);
        income.setBounds(300,240,400,30);
        income.setBackground(Color.white);
        add(income);

        JLabel gender = new JLabel("Educational");
        gender.setFont(new Font("Raleway", Font.BOLD, 20));
        gender.setBounds(100,290,200,30);
        add(gender);

        JLabel email = new JLabel("Qualification:");
        email.setFont(new Font("Raleway", Font.BOLD, 20));
        email.setBounds(100,315,200,30);
        add(email);

        String educationValues[] = {"Non-Graduate","Graduate","Post-Graduate","Doctrate","Others"};
        education = new JComboBox(educationValues);
        education.setBounds(300,315,400,30);
        education.setBackground(Color.white);
        add(education);

        JLabel marital = new JLabel("Occupation:");
        marital.setFont(new Font("Raleway", Font.BOLD, 20));
        marital.setBounds(100,390,200,30);
        add(marital);

        String occupationValues[] = {"Salaried","Self-Employmed","Business","Student","Retired","Others"};
        occupation = new JComboBox(occupationValues);
        occupation.setBounds(300,390,400,30);
        occupation.setBackground(Color.white);
        add(occupation);

        JLabel address = new JLabel("PAN number:");
        address.setFont(new Font("Raleway", Font.BOLD, 20));
        address.setBounds(100,440,200,30);
        add(address);

        pan = new JTextField();
        pan.setFont(new Font("Raleway", Font.BOLD, 14));
        pan.setBounds(300,440,400,30);
        add(pan);

        JLabel city = new JLabel("Aadhar number:");
        city.setFont(new Font("Raleway", Font.BOLD, 20));
        city.setBounds(100,490,200,30);
        add(city);

        aadhar = new JTextField();
        aadhar.setFont(new Font("Raleway", Font.BOLD, 14));
        aadhar.setBounds(300,490,400,30);
        add(aadhar);

        JLabel state = new JLabel("Senior Citizen:");
        state.setFont(new Font("Raleway", Font.BOLD, 20));
        state.setBounds(100,540,200,30);
        add(state);

        syes = new JRadioButton("Yes");
        syes.setBounds(300,540,100,30);
        syes.setBackground(Color.white);
        add(syes);

        sno = new JRadioButton("No");
        sno.setBounds(450,540,100,30);
        sno.setBackground(Color.white);
        add(sno);

        ButtonGroup maritalgroup = new ButtonGroup();
        maritalgroup.add(syes);
        maritalgroup.add(sno);


        JLabel pincode = new JLabel("Exisiting Account:");
        pincode.setFont(new Font("Raleway", Font.BOLD, 20));
        pincode.setBounds(100,590,200,30);
        add(pincode);

        eyes = new JRadioButton("Yes");
        eyes.setBounds(300,590,100,30);
        eyes.setBackground(Color.white);
        add(eyes);

        eno = new JRadioButton("No");
        eno.setBounds(450,590,100,30);
        eno.setBackground(Color.white);
        add(eno);

        ButtonGroup emaritalgroup = new ButtonGroup();
        emaritalgroup.add(eyes);
        emaritalgroup.add(eno);

        next = new JButton("Next");
        next.setBackground(Color.BLACK);
        next.setForeground(Color.WHITE);
        next.setOpaque(true);
        next.setBorderPainted(false);
        next.setFont(new Font("Raleway", Font.BOLD, 14));
        next.setBounds(620,660,80,30);
        next.addActionListener(this);
        add(next);

        getContentPane().setBackground(Color.white);
        setSize(850,800);
        setLocation(350,10);
        setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        String sreligion = (String) religion.getSelectedItem();
        String scategory = (String) category.getSelectedItem();
        String sincome = (String) income.getSelectedItem();
        String seducation = (String) education.getSelectedItem();
        String soccupation = (String) occupation.getSelectedItem();
        String seniorcitizen = null;
        if(syes.isSelected()){
            seniorcitizen = "Yes";
        } else if (sno.isSelected()) {
            seniorcitizen = "No";
        }

        String existingaccount = null;
        if(eyes.isSelected()){
            existingaccount = "Yes";
        } else if (eno.isSelected()) {
            existingaccount = "No";
        }

        String span = pan.getText();
        String saadhar = aadhar.getText();

        try{
            Conn c = new Conn();
            String query = "insert into signuptwo values('"+formno+"','"+sreligion+"','"+scategory+"','"+sincome+"','"+seducation+"','"+soccupation+"','"+span+"','"+saadhar+"','"+seniorcitizen+"','"+existingaccount+"')";
            c.s.executeUpdate(query);

            setVisible(false);
            new SignupThree(formno).setVisible(true);
        } catch(Exception ae){
            System.out.println(ae);
        }
    }
    public static void main(String[] args){
        new SignupTwo("");
    }
}