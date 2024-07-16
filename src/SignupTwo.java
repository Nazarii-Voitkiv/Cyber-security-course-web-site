import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SignupTwo extends JFrame implements ActionListener {
    private static final int FRAME_WIDTH = 950;
    private static final int FRAME_HEIGHT = 800;
    JTextField beneficiaryContactNumberTextField, beneficiaryNameTextField;
    JButton nextButton;
    JRadioButton yesUsCitizenRadioButton, noUsCitizenRadioButton, yesExisitingAccountButton, noExisitingAccountButton;
    JTextField ssnTextField, driversLicenseOrStateIDTextField, jobTitleTextField, yearsAtJobTextField;
    JComboBox incomeComboBox;
    String formNumber;

    CreateComponents components;
    SignupTwo(String formNumber){
        components = new CreateComponents();
        this.formNumber = formNumber;

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(null);
        setTitle("NEW ACCOUNT APPLICATION FORM - PAGE TWO");
        getContentPane().setBackground(Color.white);
        setSize(FRAME_WIDTH,FRAME_HEIGHT);
        addComponents();
        setLocationRelativeTo(null);
        setVisible(true);
    }

    private void addComponents() {
        addAdditionalDetailsLabel();
        addSsnLabel();
        addSnnTextField();
        addDriversLicenseOrStateIDLabel();
        addDriversLicenseOrStateIDTextField();
        addEmployerNameLabel();
        addEmployerNameTextField();
        addJobTitleLabel();
        addJobTitleTextField();
        addYearsAtJobLabel();
        addYearsAtJobTextField();
        addIncomeLabel();
        addIncomeComboBox();
        addUsCitizenLabel();
        addUsCitizenButtonGroup();
        addExisitingAccountLabel();
        addExisitingAccountButtonGroup();
        addBeneficiaryNameLabel();
        addBeneficiaryNameTextField();
        addBeneficiaryContactNumberLabel();
        addBeneficiaryContactNumberTextField();
        addNextButton();
    }

    private void addAdditionalDetailsLabel() {
        JLabel additionalDetailsLabel = components.createLabel("Page 2: Additional Details",290,80,400,30,22);
        add(additionalDetailsLabel);
    }

    private void addSsnLabel() {
        JLabel ssnLabel = components.createLabel("Social Security Number (SSN):",100,140,400,30,20);
        add(ssnLabel);
    }

    private void addSnnTextField() {
        ssnTextField = components.createTextField(450,140,400,30,14);
        add(ssnTextField);
    }

    private void addDriversLicenseOrStateIDLabel() {
        JLabel driversLicenseOrStateIDLabel = components.createLabel("Driver's License or State ID:",100,190,400,30,20);
        add(driversLicenseOrStateIDLabel);
    }

    private void addDriversLicenseOrStateIDTextField() {
        driversLicenseOrStateIDTextField = components.createTextField(450,190,400,30,14);
        add(driversLicenseOrStateIDTextField);
    }

    private void addEmployerNameLabel() {
        JLabel employerNameLabel = components.createLabel("Employer Name:",100,240,200,30,20);
        add(employerNameLabel);
    }

    private void addEmployerNameTextField() {
        beneficiaryContactNumberTextField = components.createTextField(450,240,400,30,14);
        add(beneficiaryContactNumberTextField);
    }

    private void addJobTitleLabel() {
        JLabel jobTitleLabel = components.createLabel("Job Title:",100,290,200,30,20);
        add(jobTitleLabel);
    }

    private void addJobTitleTextField() {
        jobTitleTextField = components.createTextField(450,290,400,30,14);
        add(jobTitleTextField);
    }

    private void addYearsAtJobLabel() {
        JLabel yearsAtJobLabel = components.createLabel("Years at Current Job:",100,340,300,30,20);
        add(yearsAtJobLabel);
    }

    private void addYearsAtJobTextField() {
        yearsAtJobTextField = components.createTextField(450,340,400,30,14);
        add(yearsAtJobTextField);
    }

    private void addIncomeLabel() {
        JLabel incomeLabel = components.createLabel("Income:",100,390,200,30,20);
        add(incomeLabel);
    }

    private void addIncomeComboBox() {
        String incomeValues[] = {"Null","<150,000","<250,000","<500,000","Upto 1,000,000","Above 1,000,000"};
        incomeComboBox = components.createComboBox(incomeValues,450,390,400,30,Color.white);
        add(incomeComboBox);
    }

    private void addUsCitizenLabel() {
        JLabel usCitizenLabel = components.createLabel("Are you a US Citizen?",100,440,300,30,20);
        add(usCitizenLabel);
    }

    private void addUsCitizenButtonGroup() {
        yesUsCitizenRadioButton = new JRadioButton("Yes");
        yesUsCitizenRadioButton.setBounds(450,440,100,30);
        yesUsCitizenRadioButton.setBackground(Color.white);
        add(yesUsCitizenRadioButton);

        noUsCitizenRadioButton = components.createRadioButton("No",600,440,100,30, 16, Color.white);
        noUsCitizenRadioButton.setBackground(Color.white);
        add(noUsCitizenRadioButton);

        ButtonGroup usCitizenButtonGroup = new ButtonGroup();
        usCitizenButtonGroup.add(yesUsCitizenRadioButton);
        usCitizenButtonGroup.add(noUsCitizenRadioButton);
    }

    private void addExisitingAccountLabel() {
        JLabel exisitingAccountLabel = components.createLabel("Exisiting Account:",100,490,200,30,20);
        add(exisitingAccountLabel);
    }

    private void addExisitingAccountButtonGroup() {
        yesExisitingAccountButton = components.createRadioButton("Yes",450,490,100,30,16,Color.white);
        add(yesExisitingAccountButton);

        noExisitingAccountButton = components.createRadioButton("No",600,490,100,30,16,Color.white);
        add(noExisitingAccountButton);

        ButtonGroup exisitingAccountButtonGroup = new ButtonGroup();
        exisitingAccountButtonGroup.add(yesExisitingAccountButton);
        exisitingAccountButtonGroup.add(noExisitingAccountButton);
    }

    private void addBeneficiaryNameLabel() {
        JLabel beneficiaryNameLabel = components.createLabel("Beneficiary Name:",100,540,300,30,20);
        add(beneficiaryNameLabel);
    }

    private void addBeneficiaryNameTextField() {
        beneficiaryNameTextField = components.createTextField(450,540,400,30,14);
        add(beneficiaryNameTextField);
    }

    private void addBeneficiaryContactNumberLabel() {
        JLabel beneficiaryContactNumberLabel = components.createLabel("Beneficiary Contact Number:",100,590,300,30,20);
        add(beneficiaryContactNumberLabel);
    }

    private void addBeneficiaryContactNumberTextField() {
        beneficiaryContactNumberTextField = components.createTextField(450,590,400,30,14);
        add(beneficiaryContactNumberTextField);
    }

    private void addNextButton() {
        nextButton = components.createButton("Next",620,660,80,30,14);
        nextButton.addActionListener(this);
        add(nextButton);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        next();
    }

    private void next() {
//        String sreligion = (String) religion.getSelectedItem();
//        String scategory = (String) category.getSelectedItem();
//        String sincome = (String) income.getSelectedItem();
//        String seducation = (String) education.getSelectedItem();
//        String soccupation = (String) occupation.getSelectedItem();
        String seniorcitizen = null;
        if(yesUsCitizenRadioButton.isSelected()){
            seniorcitizen = "Yes";
        } else if (noUsCitizenRadioButton.isSelected()) {
            seniorcitizen = "No";
        }

        String existingaccount = null;
        if(yesExisitingAccountButton.isSelected()){
            existingaccount = "Yes";
        } else if (noExisitingAccountButton.isSelected()) {
            existingaccount = "No";
        }

        String span = beneficiaryContactNumberTextField.getText();
        String saadhar = beneficiaryNameTextField.getText();

        try{
            Conn c = new Conn();
//            String query = "insert into signuptwo values('"+ formNumber +"','"+sreligion+"','"+scategory+"','"+sincome+"','"+seducation+"','"+soccupation+"','"+span+"','"+saadhar+"','"+seniorcitizen+"','"+existingaccount+"')";
//            c.s.executeUpdate(query);

            setVisible(false);
            new SignupThree(formNumber).setVisible(true);
        } catch(Exception ae){
            System.out.println(ae);
        }
    }
    public static void main(String[] args){
        new SignupTwo("");
    }
}