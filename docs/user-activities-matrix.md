
# User Activities Matrix

This document describes the activities that each user role can perform within the IKE 2.0 system.

## User Roles and Activities

| Users | Activities |
|-------|------------|
| **Regional Administrator** | • Manage all system users, roles, municipalities, groups, principals, and school units<br/>• Configure school years and study paths<br/>• Manage price codes and study path pricing<br/>• Configure integration with Tax Agency Hub, UHR BEDA, and Admission systems<br/>• Access calculation engine for payment processing<br/>• Generate geographical analysis reports<br/>• View system logs and manage enrollment settings<br/>• Access comprehensive system support<br/>• Full system administration capabilities |
| **Municipality Administrator** | • Manage municipal students (TF registration, conflict resolution, travel cards)<br/>• Oversee KAA management (dashboard, registry, measures, contact occasions, SCB reports)<br/>• Import student data and manage integrations (Tax Agency Hub, UHR BEDA, Admission)<br/>• Configure accounting settings and municipal price lists<br/>• Manage additional amounts and payment blocks<br/>• Generate payment documents and handle inter-municipal compensation<br/>• Manage municipal school units and users<br/>• Generate financial reports (money to receive/pay, municipal statistics, financial exports)<br/>• Access reports dashboard for comprehensive reporting<br/>• Create geographical analysis reports<br/>• Manage messages, enrollment settings, and activity logs |
| **School Administrator** | • Manage student roster, classes, and TF number registration<br/>• Handle conflict resolution and travel card documents<br/>• Manage KAA dashboard, registry, and contact occasions<br/>• Access school unit information<br/>• Generate reports dashboard, student lists, and financial reports<br/>• Manage messages, activity logs, and personal settings<br/>• Access system support |
| **Organization Administrator** | • Manage customer accounts and group management<br/>• Oversee account hierarchy and billing/subscriptions<br/>• Configure organization settings<br/>• Manage global users, roles, and permissions<br/>• Control access and security settings<br/>• Monitor system health and usage analytics<br/>• Review audit logs<br/>• Provide customer support and manage announcements<br/>• Maintain knowledge base<br/>• Access system support |
| **Development Administrator** | • Configure API integrations and customer integrations<br/>• Perform integration testing and maintain API documentation<br/>• Manage translation systems and language settings<br/>• Operate translation tools<br/>• Manage development environments and databases<br/>• Configure system settings and feature flags<br/>• Monitor system logs and performance<br/>• Track errors and use debug tools<br/>• Manage code repository and development documentation<br/>• Run testing suites<br/>• Access system support |

## Specific Report Generation Capabilities by Role

### Municipality Administrator Report Generation
| Report Category | Available Reports |
|-----------------|-------------------|
| **Income Reports** | • Income Information for Principal (PDF, CSV)<br/>• Individual Principal Income (CSV, Excel) |
| **Payment Documents** | • Payment Documents for Municipality (PDF)<br/>• Internal Debit Documents (PDF) |
| **Error Lists** | • Error List for Principal (PDF)<br/>• Error List for Municipality (PDF) |
| **Change Lists** | • Change List for Principal (PDF)<br/>• Change List for Municipality (PDF) |
| **Accounting Documents** | • Accounting Documents for Municipality (PDF, CSV)<br/>• Financial Integration Files (CSV, Excel) |
| **Invoice Documents** | • Invoice Documents for Principal (PDF)<br/>• Address Labels (PDF) |

### School Administrator Report Generation
| Report Category | Available Reports |
|-----------------|-------------------|
| **Student Reports** | • Student Lists<br/>• Class rosters and enrollment reports |
| **Financial Reports** | • School-specific financial reports<br/>• Budget and expense tracking |
| **KAA Reports** | • Contact occasions reports<br/>• Student support documentation |

### Regional Administrator Report Generation
| Report Category | Available Reports |
|-----------------|-------------------|
| **System Reports** | • Regional statistics and analytics<br/>• Cross-municipal data analysis |
| **Geographical Analysis** | • Geographic distribution reports<br/>• Regional trend analysis |
| **Administrative Reports** | • User activity and system usage<br/>• Integration status and performance |

## Payment Document Management Activities

### Municipality Administrator
- **View Payment Documents**: Access table of all payment documents with filtering by period, type (preliminary/definitive), municipality, principal, and status
- **Generate Payment Documents**: Create preliminary documents daily (overwritten) and definitive documents on measurement date
- **Document Details**: View individual payment document content including student personal ID, names, school unit, study path, year, price code, amounts, and error messages
- **Filter and Search**: Use advanced filtering for period selection, document type, and organizational scope

### Regional Administrator (System Manager)
- **Delete Payment Documents**: Remove payment documents that are displayed to users (with confirmation)
- **Full Document Management**: Complete oversight of all payment documentation across the region
- **System Oversight**: Monitor document generation processes and resolve system-level issues

## KAA (Student Support) Activities

### Municipality Administrator
- **KAA Dashboard**: Overview of student support metrics and statistics
- **KAA Registry Management**: Maintain registry of students requiring support
- **Measures and Actions**: Document and track support interventions
- **Contact Occasions**: Record and manage student/family contact history
- **Statistics Sweden Reports**: Generate required SCB reporting

### School Administrator
- **KAA Dashboard**: School-specific support metrics
- **KAA Registry**: Access school's student support registry
- **Contact Occasions**: Manage direct student contact documentation

## Integration Management Activities

### Municipality Administrator
- **Student Data Import**: Import and synchronize student information
- **Tax Agency Hub Integration**: Manage population registry connections
- **UHR BEDA Integration**: Handle higher education data exchange
- **Admission Integration**: Coordinate student admission processes

### Regional Administrator
- **System Integration Oversight**: Configure and monitor all integration points
- **Calculation Engine Management**: Oversee payment calculation processes
- **Integration Health Monitoring**: Ensure all systems communicate properly

### Development Administrator
- **API Configuration**: Set up and maintain integration endpoints
- **Integration Testing**: Validate data exchange processes
- **Documentation Management**: Maintain integration specifications
- **Environment Management**: Control development, staging, and production environments

## Financial Management Activities

### Municipality Administrator
- **Accounting Configuration**: Set up municipal accounting structures
- **Price List Management**: Create and maintain municipal pricing
- **Additional Amounts**: Configure supplementary charges
- **Payment Blocks**: Manage payment restrictions and holds
- **Compensation Management**: Handle inter-municipal financial settlements
- **Payment Document Generation**: Create formal payment documentation

### Regional Administrator
- **System-wide Financial Oversight**: Monitor all financial processes
- **Price Code Management**: Configure regional pricing structures
- **Financial Integration**: Ensure proper connection with municipal financial systems

This matrix ensures that each user role has appropriate access to system functions based on their organizational responsibility and authority level.
